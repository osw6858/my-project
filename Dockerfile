FROM node:20.12.2-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 3000
EXPOSE 9090

CMD ["sh", "-c", "pnpm mock & pnpm dev"]