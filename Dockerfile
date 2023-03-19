FROM node:18

WORKDIR /app

COPY package*.json ./ 

COPY prisma ./

RUN npm install

# COPY . .

ENV DATABASE_URL=""
ENV NEXTAUTH_SECRET=""
ENV NEXTAUTH_URL="http://localhost:3000"

RUN npx prisma generate

RUN npm run build

CMD ["npm","run","start:prod"]

EXPOSE 3000