FROM --platform=linux/amd64 node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS sourcer
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@ttbs/api --docker

FROM base AS installer
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app
COPY --from=sourcer /app/out/full/ .
COPY --from=sourcer /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=sourcer /app/turbo.json ./turbo.json
COPY --from=sourcer /app/.env.prod ./packages/prisma/.env
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
# COPY --from=sourcer /app/out/full/ .
COPY --from=sourcer /app/.env.prod ./packages/prisma/.env
# COPY .gitignore .gitignore
RUN pnpm build:api

FROM base as api-runner
WORKDIR /app

COPY --from=builder /app/ .
COPY --from=builder /app/apps/api/config ./apps/api/dist/config
# COPY --from=sourcer /app/.env.prod ./.env

ENV NODE_ENV=production
ENV NODE_CONFIG_DIR=./apps/api/dist/config
# EXPOSE 8081
CMD [ "node", "apps/api/dist/src/index.js" ]