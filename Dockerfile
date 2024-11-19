FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22 AS runner

WORKDIR /app

COPY --from=builder /app/dist/src ./dist/src
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./

EXPOSE 3000

CMD ["node", "dist/src/index.js"]
