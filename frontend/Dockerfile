# Production-ready React Dockerfile for Balaji Construction Frontend
FROM node:18-alpine AS builder

# Build stage
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Copy source
COPY src ./src
COPY public ./public
COPY tailwind.config.js postcss.config.js ./

# Build application
RUN npm run build

# Production stage - Use nginx for static files
FROM nginx:alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built app from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Create non-root user
RUN addgroup -g 1001 -S nginx && \
    adduser -S nginx -u 1001 || true

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
