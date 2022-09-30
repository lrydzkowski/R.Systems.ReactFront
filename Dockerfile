FROM nginx:latest
EXPOSE 80
EXPOSE 443

COPY . /usr/share/nginx/html