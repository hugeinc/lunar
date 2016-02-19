FROM node:5.4.0

RUN mkdir -p /src

COPY . /src
WORKDIR /src
RUN npm i

EXPOSE 4000

CMD while true; do sleep 1000; done
