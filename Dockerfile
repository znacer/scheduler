# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.1-slim AS base
WORKDIR /usr/src/app

ENV APP_URL=http://localhost:5173
ENV PUBLIC_TILE_STYLE=https://basemaps.cartocdn.com/gl/positron-gl-style/style.json
ENV PUBLIC_BACKEND_URL=http://localhost:8081/scheduler
ENV REALM_URL=http://localhost:8080/realms/dev
ENV KEYCLOAK_URL=http://localhost:8080
ENV KEYCLOAK_REALM=dev
ENV KEYCLOAK_CLIENT_ID=devclient
ENV KEYCLOAK_CLIENT_SECRET=0KBzVgsEgnTk1CJ6upswBCxAFByEUk3i
ENV DATABASE_URL=postgres:mysecretpassword@localhost:5432/scheduling-app
ENV DATABASE_HOST=localhost
ENV DATABASE_PORT=5432
ENV DATABASE_USER=postgres
ENV DATABASE_PASSWORD=mysecretpassword
ENV DATABASE_DB=scheduling-app
# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/build/ .
COPY --from=prerelease /usr/src/app/package.json .

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "./index.js" ]
