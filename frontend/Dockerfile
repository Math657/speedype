FROM node:12.14.1 as build-stage
WORKDIR /app/
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:1.19.4 as production-stage
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]