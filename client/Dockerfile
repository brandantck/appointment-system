FROM node:alpine as base
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./public ./public
COPY ./src ./src

FROM base as prod
RUN npm install -g serve
RUN npm run build
CMD ["serve", "-s", "build"]


FROM base as dev
CMD ["npm", "run", "start"]