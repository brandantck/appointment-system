FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./src ./src
RUN apk add --no-cache bash