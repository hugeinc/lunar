FROM node:5.4.0

ENV USER root

RUN mkdir -p /app/
RUN mkdir -p /install/
ENV PATH /install/node_modules/.bin:$PATH
ENV NODE_PATH /install/node_modules/

COPY ./package.json /install/package.json
RUN cd install; npm install

WORKDIR /app/
COPY . /app/

CMD while true; do sleep 1000; done
