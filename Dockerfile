# Build stage
FROM oven/bun:1.2-debian AS build

WORKDIR /app

# Install pnpm
# RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN bun install -g pnpm

# Copy dependencies
COPY pnpm-lock.yaml package.json ./

# Build dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy source and compile
COPY . .

# RUN bun build
RUN bun build --compile --minify --sourcemap ./src --outfile hono-docker-app

# Our application runner
FROM gcr.io/distroless/base-debian12:nonroot AS runner

ENV NODE_ENV=production

ARG BUILD_APP_PORT=3000
ENV APP_PORT=${BUILD_APP_PORT}
EXPOSE ${APP_PORT}

WORKDIR /app

# Copy the compiled executable from the build stage
COPY --from=build /app/hono-docker-app .

ENTRYPOINT ["./hono-docker-app"]