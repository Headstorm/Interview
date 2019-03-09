FROM node:alpine

RUN npm install -g gatsby-cli \
&& mkdir frontend

WORKDIR /frontend/
COPY jamstack/ .
RUN npm install && gatsby build

CMD ["gatsby", "serve"]
