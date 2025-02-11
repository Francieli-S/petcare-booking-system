# Use a Node.js image for building
FROM node:16.20.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . . 
RUN npm run build

# Use a distroless image for runtime
FROM gcr.io/distroless/nodejs16-debian11 AS runtime
WORKDIR /app

# Copy necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Set the command correctly
CMD ["node", "./dist/index.js"]
