FROM node:12-alpine

WORKDIR /node-app
COPY package.json .

RUN yarn

ADD . /node-app

RUN yarn build

EXPOSE ${PORT}

ENTRYPOINT ["yarn", "start"]
