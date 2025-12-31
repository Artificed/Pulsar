'use client';

import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { LoggerProvider, BatchLogRecordProcessor, ConsoleLogRecordExporter } from '@opentelemetry/sdk-logs';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';
import { trace } from '@opentelemetry/api';
import type { AnyValueMap } from '@opentelemetry/api-logs';

let initialized = false;
let loggerProvider: LoggerProvider | null = null;

export function initializeOtel() {
  if (initialized || typeof window === 'undefined') {
    return;
  }

  const otelCollectorUrl = process.env.NEXT_PUBLIC_OTEL_COLLECTOR_URL || 'http://localhost:4318';

  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'frontend',
    [ATTR_SERVICE_VERSION]: '0.1.0',
  });

  // Initialize Trace Provider
  const traceExporter = new OTLPTraceExporter({
    url: `${otelCollectorUrl}/v1/traces`,
  });

  const tracerProvider = new WebTracerProvider({
    resource,
    spanProcessors: [new BatchSpanProcessor(traceExporter)],
  });

  tracerProvider.register({
    contextManager: new ZoneContextManager(),
  });

  const logExporter = new OTLPLogExporter({
    url: `${otelCollectorUrl}/v1/logs`,
  });

  const logProcessors = [new BatchLogRecordProcessor(logExporter)];
  
  if (process.env.NODE_ENV === 'development') {
    logProcessors.push(new BatchLogRecordProcessor(new ConsoleLogRecordExporter()));
  }

  loggerProvider = new LoggerProvider({
    resource,
    processors: logProcessors,
  });

  logs.setGlobalLoggerProvider(loggerProvider);

  registerInstrumentations({
    instrumentations: [
      new FetchInstrumentation({
        propagateTraceHeaderCorsUrls: [
          /localhost/,
          /127\.0\.0\.1/,
          /user-service/,
          /auth-service/,
          /event-service/,
          /booking-service/,
        ],
      }),
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls: [
          /localhost/,
          /127\.0\.0\.1/,
        ],
      }),
    ],
  });

  initialized = true;
  console.log('OpenTelemetry initialized for frontend');
}

export function getLogger(name: string = 'frontend') {
  const provider = logs.getLoggerProvider();
  return provider.getLogger(name);
}

export const otelLog = {
  debug: (message: string, attributes?: AnyValueMap) => {
    const logger = getLogger();
    logger.emit({
      severityNumber: SeverityNumber.DEBUG,
      severityText: 'DEBUG',
      body: message,
      attributes,
    });
  },
  
  info: (message: string, attributes?: AnyValueMap) => {
    const logger = getLogger();
    logger.emit({
      severityNumber: SeverityNumber.INFO,
      severityText: 'INFO',
      body: message,
      attributes,
    });
  },
  
  warn: (message: string, attributes?: AnyValueMap) => {
    const logger = getLogger();
    logger.emit({
      severityNumber: SeverityNumber.WARN,
      severityText: 'WARN',
      body: message,
      attributes,
    });
  },
  
  error: (message: string, attributes?: AnyValueMap) => {
    const logger = getLogger();
    logger.emit({
      severityNumber: SeverityNumber.ERROR,
      severityText: 'ERROR',
      body: message,
      attributes,
    });
  },
};

export function getTracer(name: string = 'frontend') {
  return trace.getTracer(name);
}

export async function shutdownOtel() {
  if (loggerProvider) {
    await loggerProvider.shutdown();
  }
}
