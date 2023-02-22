FROM node:18-alpine AS builder
WORKDIR /app
COPY ./frontend/package*.json .
RUN npm i
COPY ./frontend .
COPY ./.env .
RUN npm run build

FROM nginx:1.23.3-alpine AS frontend
COPY --from=builder  /app/build /usr/share/nginx/html
COPY ./nginx/conf.d /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]