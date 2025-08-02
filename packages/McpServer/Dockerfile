FROM node:20-alpine AS builder

COPY src /app/src
COPY tsconfig.json /app/
COPY package*.json /app/

WORKDIR /app

RUN npm install

RUN npm run build

FROM node:20-alpine AS release

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json

ENV NODE_ENV=production

WORKDIR /app

RUN npm ci --only=production
ENTRYPOINT ["node", "dist/index.js"]