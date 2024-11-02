FROM node:22-alpine AS builder

ARG BACKEND

ENV VITE_BACKEND=${BACKEND}

WORKDIR /app

COPY ./package*.json /app

RUN npm i

COPY . .

RUN npm run build 

FROM rtsp/lighttpd

RUN echo 'server.modules += ( "mod_rewrite" )' > /etc/lighttpd/conf.d/99-vue.conf \
   &echo 'url.rewrite-if-not-file = ( "/.*" => "/index.html" )' >> > /etc/lighttpd/conf.d/99-vue.conf

COPY --from=builder /app/dist/ /var/www/html/

EXPOSE 80