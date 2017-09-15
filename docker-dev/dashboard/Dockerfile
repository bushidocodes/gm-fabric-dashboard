FROM node:8.4

RUN apt-get -y update --fix-missing && apt-get -y autoremove

RUN npm install -g http-server

RUN mkdir -p /home/ubuntu/dashboard
WORKDIR  /home/ubuntu/dashboard
