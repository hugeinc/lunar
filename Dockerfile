FROM node:5.4.0

RUN mkdir -p /app

ADD package.json /app
ADD makefile /app
ADD files/ /app/

WORKDIR /app

RUN npm i

EXPOSE 4000

CMD while true; do sleep 1000; done
