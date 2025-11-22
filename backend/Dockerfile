# Use Node.js 22 Alpine as base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src ./src

# Expose port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start the application
CMD ["node", "src/index.js"]
