FROM node:10.14.1-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn --pure-lockfile

EXPOSE 3000

CMD ["yarn", "dev"]