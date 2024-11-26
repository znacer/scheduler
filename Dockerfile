FROM quay.apps.prod.colbert.def/zakaria_nacer/scheduler-frontend-builder:latest AS base
WORKDIR /app

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

COPY build ./build

EXPOSE 3000/tcp
ENTRYPOINT [ "node", "build" ]
