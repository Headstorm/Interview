FROM node:alpine

RUN npm install -g gatsby-cli \
&& mkdir frontend

WORKDIR /frontend/
COPY jamstack/ .
RUN npm install && gatsby build

EXPOSE 9000
CMD ["gatsby", "serve", "-H", "0.0.0.0"]
