import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@modelcontextprotocol/sdk/client';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'http://localhost:8082/mcp';

const SYSTEM_PROMPT = `You are Pulsar AI, a friendly and helpful event assistant for the Pulsar planetarium and cosmic event platform. 

Your role is to help users with:
- Finding and recommending events (planetarium shows, space exhibitions, stargazing nights, etc.)
- Answering questions about event details, schedules, and venues
- Helping with booking information and ticket availability
- Providing information about astronomy and space-related topics
- General customer support for the platform

You have access to tools that can help you look up real event data, bookings, and user information. Use these tools when users ask about specific events, their bookings, or need real data.

Keep your responses concise, friendly, and helpful. Use a warm, enthusiastic tone that matches the cosmic theme of the platform.`;

function convertToGeminiType(jsonType: string): SchemaType {
  const typeMap: Record<string, SchemaType> = {
    'string': SchemaType.STRING,
    'number': SchemaType.NUMBER,
    'integer': SchemaType.INTEGER,
    'boolean': SchemaType.BOOLEAN,
    'array': SchemaType.ARRAY,
    'object': SchemaType.OBJECT,
  };
  return typeMap[jsonType] || SchemaType.STRING;
}

function convertSchema(schema: any): any {
  if (!schema) {
    return { type: SchemaType.OBJECT, properties: {} };
  }
  
  const result: Record<string, unknown> = {
    type: convertToGeminiType(schema.type || 'object'),
    properties: {},
  };
  
  if (schema.description) result.description = schema.description;
  if (schema.properties) {
    result.properties = Object.fromEntries(
      Object.entries(schema.properties).map(([key, value]: [string, any]) => [
        key,
        convertSchema(value),
      ])
    );
  }
  if (schema.required) result.required = schema.required;
  if (schema.items) result.items = convertSchema(schema.items);
  
  return result;
}

async function getMcpClient() {
  const client = new Client({
    name: 'pulsar-chat-client',
    version: '1.0.0',
  });

  const transport = new StreamableHTTPClientTransport(new URL(MCP_SERVER_URL));
  await client.connect(transport);
  
  return client;
}

export async function POST(request: NextRequest) {
  let mcpClient: Client | null = null;
  
  try {
    const { message, history } = await request.json();

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    let tools: { name: string; description: string; parameters: any }[] = [];
    try {
      mcpClient = await getMcpClient();
      const toolsResponse = await mcpClient.listTools();
      
      tools = toolsResponse.tools.map((tool) => ({
        name: tool.name,
        description: tool.description || '',
        parameters: convertSchema(tool.inputSchema),
      }));
      
      console.log('MCP Tools available:', tools.map(t => t.name));
    } catch (mcpError) {
      console.warn('MCP connection failed, continuing without tools:', mcpError);
    }

    const modelConfig: any = { model: 'gemini-2.5-flash' };
    if (tools.length > 0) {
      modelConfig.tools = [{
        functionDeclarations: tools.map(tool => ({
          name: tool.name,
          description: tool.description,
          parameters: tool.parameters,
        })),
      }];
    }

    const model = genAI.getGenerativeModel(modelConfig);

    const chatHistory = history?.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    })) || [];

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood! I am Pulsar AI, your cosmic event assistant. I\'m here to help you discover amazing planetarium shows, space exhibitions, and stargazing events. How can I assist you today?' }],
        },
        ...chatHistory,
      ],
    });

    let result = await chat.sendMessage(message);
    let response = result.response;

    while (response.candidates?.[0]?.content?.parts?.some(part => 'functionCall' in part)) {
      const functionCalls = response.candidates[0].content.parts.filter(
        (part): part is { functionCall: { name: string; args: Record<string, unknown> } } => 'functionCall' in part
      );

      const toolResults = [];
      
      for (const part of functionCalls) {
        const { name, args } = part.functionCall;
        console.log(`Calling MCP tool: ${name}`, args);
        
        try {
          if (mcpClient) {
            const toolResult = await mcpClient.callTool({ name, arguments: args });
            console.log(`Tool ${name} result:`, toolResult);
            
            toolResults.push({
              functionResponse: {
                name,
                response: { result: toolResult.content },
              },
            });
          }
        } catch (toolError) {
          console.error(`Tool ${name} error:`, toolError);
          toolResults.push({
            functionResponse: {
              name,
              response: { error: `Tool execution failed: ${toolError}` },
            },
          });
        }
      }

      result = await chat.sendMessage(toolResults);
      response = result.response;
    }

    const text = response.text();
    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  } finally {
    if (mcpClient) {
      try {
        await mcpClient.close();
      } catch {
      }
    }
  }
}
