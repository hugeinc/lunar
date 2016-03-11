FROM node:5.4.0

RUN mkdir -p /app

COPY . /app
WORKDIR /app
RUN npm i

EXPOSE 4000

CMD npm run dev
