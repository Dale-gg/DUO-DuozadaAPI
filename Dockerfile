FROM node:12-alpine

WORKDIR /usr/src/app
COPY package.json .

RUN yarn

ADD . /usr/src/app

RUN yarn build
