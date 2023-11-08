FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS sourcer
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@ttbs/api --docker

FROM base AS installer
WORKDIR /app
COPY --from=sourcer /app/out/json/ .
COPY --from=sourcer /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=sourcer /app/turbo.json ./turbo.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=sourcer /app/out/full/ .
COPY --from=sourcer .env.prod ./packages/prisma/.env
COPY .gitignore .gitignore
RUN pnpm build:api

FROM base as api-runner
WORKDIR /app
COPY --from=builder /app/apps/api/ .
COPY --from=sourcer .env.prod ./.env
ENV NODE_ENV=production
EXPOSE 8000
CMD [ "node", "--env-file=.env", "dist/src/index.js" ]