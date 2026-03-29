# Production-ready Node.js Dockerfile for Balaji Construction Backend
FROM node:18-alpine AS builder

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dumb-init to handle signals properly
RUN apk add --no-cache dumb-init

# Copy node modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application files
COPY package*.json ./
COPY server.js .
COPY controllers ./controllers
COPY models ./models
COPY routes ./routes
COPY middleware ./middleware
COPY data ./data

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use dumb-init to run Node
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
