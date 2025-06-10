FROM node:24-alpine@sha256:dfea0736e82fef246aba86b2082a5e86c4825470302692b841d097dd61253b79 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install --force

COPY . .

RUN npm run astro telemetry disable
RUN npm run build
RUN node scripts/find-dependencies.js


FROM oven/bun:1.2.14-alpine@sha256:b5d37e653d1b86f23c15ecac4f3f9b4a5572045f16258637e033a2b16b317926 AS runtime

WORKDIR /app

ENV TZ=America/Lima
ENV HOST=0.0.0.0

COPY --from=builder /app/.env /app/.env
COPY --from=builder /app/dist /app/dist

RUN mv dist/package.json package.json
RUN bun install --production --frozen-lockfile
RUN rm -rf package.json

CMD ["bun", "--bun", "dist/server/entry.mjs"]
