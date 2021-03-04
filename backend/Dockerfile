FROM php:7.4.15-fpm-alpine AS build-stage
# ARG DB
WORKDIR /app/
ADD ./php.ini /usr/local/etc/php/
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
COPY composer.json composer.lock /app/
RUN composer install
# RUN php bin/console d:m:m
COPY . /app
CMD composer start