FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

FROM base AS development

ENV CHOKIDAR_USEPOLLING=true
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["npm", "start"]

FROM base AS build

RUN npm run build

FROM nginx:1.27-alpine AS production

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
