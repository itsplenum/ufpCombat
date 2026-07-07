# Build multi-stage para el sitio UFP (Next.js standalone)
# node:22-slim (no alpine): npm en alpine falla con "Exit handler never called"

FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# El lockfile se genera con npm 11 (host); node:22 trae npm 10 y lo rechaza
RUN npm install -g npm@11 && npm ci --no-audit --no-fund

FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system nodejs && useradd --system --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Fuente Anton usada por las OG images en runtime
COPY --from=builder /app/src/assets ./src/assets

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
