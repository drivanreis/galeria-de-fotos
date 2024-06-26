# ../app/backend/Dockerfile
FROM node:16.14-alpine
RUN apk update && apk upgrade

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

RUN npm run build

# ENTRYPOINT [ "npm", "run" ]

 CMD [ "npm run start" ]
