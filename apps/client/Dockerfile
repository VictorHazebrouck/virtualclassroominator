ARG BUN_VERSION=1.2
ARG PROJECT=client

# alpine image
FROM oven/bun:${BUN_VERSION}-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat

# alpine with turbo
FROM alpine AS base
RUN bun add --global turbo

# "prunes" one project and install only necessary dependencies
FROM base AS builder
WORKDIR /app
COPY . .
RUN ls
RUN turbo prune --scope=${PROJECT} --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/bun.lock ./bun.lock
COPY --from=builder /app/turbo.json ./turbo.json
RUN bun install --frozen-lockfile

FROM base AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
# COPY .gitignore .gitignore
RUN bun turbo run build

FROM nginx:alpine AS production
WORKDIR /app
COPY --from=sourcer /app/apps/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
