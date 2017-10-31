FROM node:8
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ./docker-prod/server/* ./

COPY ./build ./build

RUN npm install

CMD [ "node", "index.js" ]

EXPOSE 1337
