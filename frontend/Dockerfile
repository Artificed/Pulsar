FROM node:20-alpine AS base

FROM base AS build

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY src ./src
COPY public ./public
COPY next.config.ts .
COPY tsconfig.json .
COPY postcss.config.mjs .

ARG NEXT_PUBLIC_USER_SERVICE_URL
ENV NEXT_PUBLIC_USER_SERVICE_URL=${NEXT_PUBLIC_USER_SERVICE_URL}
ARG NEXT_PUBLIC_EVENT_SERVICE_URL
ENV NEXT_PUBLIC_EVENT_SERVICE_URL=${NEXT_PUBLIC_EVENT_SERVICE_URL}
ARG NEXT_PUBLIC_BOOKING_SERVICE_URL
ENV NEXT_PUBLIC_BOOKING_SERVICE_URL=${NEXT_PUBLIC_BOOKING_SERVICE_URL}

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else npm run build; \
  fi

FROM base AS production 

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

ARG NEXT_PUBLIC_USER_SERVICE_URL
ENV NEXT_PUBLIC_USER_SERVICE_URL=${NEXT_PUBLIC_USER_SERVICE_URL}
ARG NEXT_PUBLIC_EVENT_SERVICE_URL
ENV NEXT_PUBLIC_EVENT_SERVICE_URL=${NEXT_PUBLIC_EVENT_SERVICE_URL}
ARG NEXT_PUBLIC_BOOKING_SERVICE_URL
ENV NEXT_PUBLIC_BOOKING_SERVICE_URL=${NEXT_PUBLIC_BOOKING_SERVICE_URL}


CMD ["node", "server.js"]
