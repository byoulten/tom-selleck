FROM mongo:latest

ENV MONGODB_INITDB_DATABASE tom-selleck
ENV MONGODB_INITDB_ROOT_USERNAME admin
ENV MONGODB_INITDB_ROOT_PASSWORD password

COPY ./init-mongo.js /docker-entrypoint-initdb.d/