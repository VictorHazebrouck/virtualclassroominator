ARG BUN_VERSION=1.2
ARG PROJECT=client
ARG PORT=80

ARG VITE_SOCKETIO_SERVER
ARG VITE_SOCKETIO_PATH
ARG VITE_PEER_BACKEND_URL
ARG VITE_PEER_SERVER_PATH
ARG VITE_PEER_SERVER_PORT
ARG VITE_PEER_SERVER_IS_SECURE

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
ARG VITE_SOCKETIO_SERVER
ARG VITE_SOCKETIO_PATH
ARG VITE_PEER_BACKEND_URL
ARG VITE_PEER_SERVER_PATH
ARG VITE_PEER_SERVER_PORT
ARG VITE_PEER_SERVER_IS_SECURE

ENV VITE_SOCKETIO_SERVER=$VITE_SOCKETIO_SERVER
ENV VITE_SOCKETIO_PATH=$VITE_SOCKETIO_PATH
ENV VITE_PEER_BACKEND_URL=$VITE_PEER_BACKEND_URL
ENV VITE_PEER_SERVER_PATH=$VITE_PEER_SERVER_PATH
ENV VITE_PEER_SERVER_PORT=$VITE_PEER_SERVER_PORT
ENV VITE_PEER_SERVER_IS_SECURE=$VITE_PEER_SERVER_IS_SECURE




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
