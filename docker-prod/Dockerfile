FROM node:8

WORKDIR /usr/src/app

COPY ./docker-prod/server/* ./

COPY ./build ./build

RUN npm install

CMD [ "node", "index.js" ]

EXPOSE 1337
