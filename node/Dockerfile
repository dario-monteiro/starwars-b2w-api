FROM phusion/baseimage:0.9.19

RUN apt-get update &&\
    apt-get install -y git &&\
    apt-get install -y npm &&\
    npm install -g n

ARG NODE_ENV=development
ARG NODE_VERSION=latest
ARG PROJECT_PATH=/opt/app/starwars-b2w-api
ARG YARN=false
ARG DB_HOST=database
ARG DB_NAME=starwars_api
ARG DB_PORT=27017
ARG GIT_REPO=https://github.com/dario-monteiro/starwars-b2w-api.git

ENV YARN=$YARN
ENV PROJECT_PATH=$PROJECT_PATH
ENV NODE_ENV=$NODE_ENV
ENV DB_HOST=$DB_HOST
ENV DB_NAME=$DB_NAME
ENV DB_PORT=$DB_PORT
ENV GIT_REPO=$GIT_REPO

# Add
RUN groupadd -r www-app &&\
    useradd -r -g www-app www-app

RUN mkdir -p /home/www-app &&\
    chmod 777 /home/www-app -R

# Install the specified NODE_VERSION or grab latest
RUN n "$NODE_VERSION"

COPY scripts/run-nodock.sh /usr/bin/run-nodock

RUN chmod 700 /usr/bin/run-nodock

WORKDIR $PROJECT_PATH

EXPOSE 3000