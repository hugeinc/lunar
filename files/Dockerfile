FROM node:5.4.0

RUN mkdir -p /app

COPY . /app
WORKDIR /app
RUN npm i && npm i --save-dev

EXPOSE 4000

CMD while true; do sleep 1000; done
