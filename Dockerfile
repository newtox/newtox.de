FROM public.ecr.aws/docker/library/node:24-alpine AS build
WORKDIR /build
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY astro.config.mjs tsconfig.json ./
COPY public ./public
COPY src ./src
RUN --mount=type=secret,id=github_token,env=GITHUB_TOKEN pnpm build

FROM public.ecr.aws/docker/library/caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /build/dist /srv
EXPOSE 80
