# ../app/backend/Dockerfile
FROM node:16.14-alpine
RUN apk update && apk upgrade

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

RUN npm run build

CMD ["npm", "start"]
