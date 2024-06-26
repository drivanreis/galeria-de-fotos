# ../app/frontend/Dockerfile
FROM node:16.14-alpine
RUN apk update && apk upgrade

WORKDIR /app-frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# ENTRYPOINT [ "npm", "run" ]

# CMD ["start"]

# CMD ["npm", "run", "dev", "--", "--host"]

CMD ["npm", "run", "dev", "--", "--host", "--port", "3000"]
