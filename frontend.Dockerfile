# Stage 1: Build React Application
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend ./

RUN npm run build

# Stage 2: Create NGINX Application
# NGINX acts as a reverse proxy to route frontend/backend 
# requests to the right container
FROM nginx:alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]