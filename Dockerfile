FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


FROM nginx:alpine AS run-stage

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

ARG BUILD_SHA="unknown"
ENV BUILD_SHA=${BUILD_SHA}

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]