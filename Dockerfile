# Dockerfile for AWS App Runner deployment
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source and prisma
COPY src/ ./src/
COPY prisma/ ./prisma/

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose port (App Runner uses PORT env var)
EXPOSE 4000

# Start server
CMD ["npm", "start"]
