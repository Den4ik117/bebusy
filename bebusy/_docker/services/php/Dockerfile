FROM php:8.3-fpm

ARG user
ARG uid

RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    curl \
    libzip-dev \
    supervisor

RUN docker-php-ext-install zip pdo_mysql pcntl

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && chown -R $user:$user /home/$user

WORKDIR /app

USER $user

EXPOSE 9000
