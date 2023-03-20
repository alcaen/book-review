FROM node:18

WORKDIR /app

COPY package*.json ./ 

RUN npm ci

COPY . .

RUN npx prisma generate

ENV SKIP_ENV_VALIDATION=1

RUN npm run build

CMD ["npm","run","start:push"]

EXPOSE 3000