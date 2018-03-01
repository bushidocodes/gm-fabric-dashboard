FROM node:8-alpine
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ./docker-prod/server/* ./

COPY ./build ./build

RUN npm install

CMD ["npm", "start"  ]

EXPOSE 1337
