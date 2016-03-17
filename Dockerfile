FROM node:5.4.0

RUN mkdir -p /app

COPY /files /app
COPY package.json /app
COPY makefile /app
WORKDIR /app
RUN npm i

EXPOSE 4000

CMD while true; do sleep 1000; done