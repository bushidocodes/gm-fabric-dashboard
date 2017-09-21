FROM node:8

WORKDIR /app

COPY ./package.json /app
COPY ./index.js /app

CMD ["npm install"]
CMD ["node", "index.js"]

EXPOSE 8000
