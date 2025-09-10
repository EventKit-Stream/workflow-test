# Use the official Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN bun install

# Copy the source code
COPY src/ ./src/

# Build the app (if needed)
RUN bun run build

# Expose the port
EXPOSE 3000

# Run the app
CMD ["bun", "run", "dev"]
