FROM node:22-alpine

RUN addgroup --system app && adduser app --system --ingroup app
WORKDIR /app

COPY ./node_modules ./node_modules

RUN chown -R app:app /app
USER app
