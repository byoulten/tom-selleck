FROM node:latest

RUN apt-get update && apt-get install -y graphicsmagick && apt-get install tesseract-ocr -y

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

RUN npm run tsc
RUN find ./src ! -name '*.REMAIN.*' -type f -delete
RUN find ./src -type d -empty -delete

CMD npm start

EXPOSE 9000