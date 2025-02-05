FROM node:22-alpine

RUN addgroup --system app && adduser --system --ingroup app app
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN chown -R app:app /app

USER app

RUN npm run build

CMD ["npm", "run", "preview"]
