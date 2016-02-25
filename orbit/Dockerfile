FROM node:5.4.0

RUN mkdir -p /orbit

COPY . /orbit
WORKDIR /orbit
RUN npm i && npm i --save-dev

EXPOSE 4000

CMD while true; do sleep 1000; done
