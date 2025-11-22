# Use Node.js 22 Alpine as base image
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code and config files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine

# Install serve to run the built app
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Serve the built application
CMD ["serve", "-s", "dist", "-l", "3000"]
