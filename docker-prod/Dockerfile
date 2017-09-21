FROM node:8

WORKDIR /usr/src/app

COPY ./server/* ./

RUN npm install

CMD [ "node", "index.js" ]

EXPOSE 1337
