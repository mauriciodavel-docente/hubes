FROM node:20-bullseye

WORKDIR /app/backend

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

COPY . .
RUN npm run prisma:generate
EXPOSE 3000

CMD ["npm", "start"]
