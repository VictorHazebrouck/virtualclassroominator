FROM oven/bun:latest AS builder
WORKDIR /app
COPY . .
RUN bun install
RUN bun turbo prune --scope=client --docker

# Add lockfile and package.json's of isolated subworkspace
FROM oven/bun:1.2 AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/bun.lock ./bun.lock
COPY --from=builder /app/turbo.json ./turbo.json
RUN bun install --frozen-lockfile

FROM oven/bun:1.2 AS sourcer
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
