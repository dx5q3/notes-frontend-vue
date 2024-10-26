FROM node:22-alpine AS builder

ARG BACKEND

ENV VITE_BACKEND=${BACKEND}

WORKDIR /app

COPY ./package*.json /app

RUN npm i

COPY . .

RUN npm run build

FROM rtsp/lighttpd

COPY --from=builder /app/dist/ /var/www/html/

EXPOSE 80