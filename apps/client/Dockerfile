ARG BUN_VERSION=1.2
ARG PROJECT=client
ARG PORT=80

# bun alpine with turbo
FROM node:23-slim AS base
RUN npm install -g bun
RUN npm install turbo --global

# prepares one project with only necessary dependencies
FROM base AS pruner
ARG PROJECT

WORKDIR /app
COPY . .

RUN turbo prune --scope=${PROJECT} --docker

# copy stuff fron the stripped down project, install dependencies & build
FROM base AS builder
ARG PROJECT

WORKDIR /app
COPY --from=pruner /app/out/bun.lock ./bun.lock
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/full/ .

RUN bun install --frozen-lockfile
RUN turbo build --filter=${PROJECT}
RUN rm -rf ./**/*/src

# use nginx to serve the generated assets
FROM nginx:alpine AS runner
ARG PROJECT
ARG PORT

WORKDIR /app
COPY --from=builder /app/apps/${PROJECT}/dist /usr/share/nginx/html

ENV PORT=${PORT}
EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
