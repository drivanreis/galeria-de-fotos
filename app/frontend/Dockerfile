# ../app/frontend/Dockerfile
FROM node:16.14-alpine
RUN apk update && apk upgrade

WORKDIR /app-frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
