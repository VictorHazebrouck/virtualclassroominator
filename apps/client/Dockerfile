ARG BUN_VERSION=1.2
ARG PROJECT="client"
ARG PORT=80

# bun alpine image
FROM oven/bun:${BUN_VERSION}-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat

# bun alpine with pnpm and turbo
FROM alpine AS base

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PNPM_HOME}/global-bin:${PATH}"
RUN mkdir -p /root/.local/share/pnpm/global-bin

RUN pnpm config set store-dir ~/.pnpm-store
RUN pnpm config set global-bin-dir /root/.local/share/pnpm/global-bin

RUN pnpm install turbo --global

# prepares one project with only necessary dependencies
FROM base AS pruner
ARG PROJECT

WORKDIR /app
COPY . .

RUN pnpm turbo prune --scope=${PROJECT} --docker

# copy stuff fron the stipped down project and install dependencies & build
FROM base AS builder
ARG PROJECT

WORKDIR /app
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN turbo build --filter=${PROJECT}
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src


FROM nginx:alpine AS runner
ARG PROJECT
ARG PORT

WORKDIR /app
COPY --from=builder /app/apps/${PROJECT}/dist /usr/share/nginx/html

ENV PORT=${PORT}
EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
