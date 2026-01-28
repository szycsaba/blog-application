FROM php:8.5-fpm-alpine

RUN --mount=type=cache,target=/var/cache/apk \
    apk add --no-cache \
        curl \
        freetype-dev \
        git \
        icu-dev \
        libjpeg-turbo-dev \
        libpng-dev \
        libxml2-dev \
        libzip-dev \
        oniguruma-dev \
        openssh \
        unzip \
        zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        bcmath \
        exif \
        gd \
        intl \
        mbstring \
        pcntl \
        pdo_mysql \
        xml \
        zip

COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

EXPOSE 9000
