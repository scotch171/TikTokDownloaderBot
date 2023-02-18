#Sample Dockerfile for NodeJS Apps

FROM node:16

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]