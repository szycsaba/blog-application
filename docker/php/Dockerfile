FROM php:8.5-fpm-alpine

RUN apk add --no-cache \
    git \
    curl \
    zip \
    unzip \
    libxml2-dev \
    openssh \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    icu-dev

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install -j$(nproc) \
    gd \
    intl \
    pdo_mysql \
    bcmath \
    mbstring \
    exif \
    pcntl \
    xml \
    zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

EXPOSE 9000
