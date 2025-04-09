ARG BUN_VERSION=1.2
ARG PROJECT=service-p2p
ARG PORT=6020

# bun alpine image
FROM oven/bun:${BUN_VERSION}-alpine AS alpine
# RUN apk update
# RUN apk add --no-cache libc6-compat

# bun alpine with turbo
FROM alpine AS base
RUN bun install turbo --global

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

RUN bun install
RUN turbo build --filter=${PROJECT}
RUN rm -rf ./**/*/src

# use base bun alpine to start the server
FROM alpine AS runner
ARG PROJECT
ARG PORT

WORKDIR /app
COPY --from=builder /app/apps/${PROJECT}/dist /app

ENV PORT=${PORT}
EXPOSE ${PORT}

# CMD [ "/bin/sh" ]
CMD ["bun", "run", "main.js"]
