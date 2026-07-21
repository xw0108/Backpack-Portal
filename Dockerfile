# ╭─────────────╮
# │ Build-Stage │
# ╰─────────────╯
FROM node:18-alpine AS build-stage

WORKDIR /app

RUN test -f icicle-service.yaml || (echo "ERROR: icicle-service.yaml is missing." && exit 1) \
    && test -f package.json || (echo "ERROR: package.json is missing." && exit 1)

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ╭───────────╮
# │ Run-Stage │
# ╰───────────╮
FROM nginx:alpine AS run-stage

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

ARG BUILD_SHA="unknown"
ENV BUILD_SHA=${BUILD_SHA}

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]