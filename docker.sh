#!/bin/bash

# Examples
# ./docker.sh -start
# ./docker.sh -start-fresh
# ./docker.sh -fresh
# ./docker.sh -init-backend
# ./docker.sh -init-frontend
# ./docker.sh -composer-install
# ./docker.sh -frontend-install
# ./docker.sh -install
# ./docker.sh -stop

DOCKER="winpty docker"

start()
{
    $DOCKER compose up -d
}

stop_stack()
{
    $DOCKER compose stop
}

init_backend()
{
    if [ -f "./backend/composer.json" ]; then
        echo "backend/composer.json exists, skipping Laravel init."
        return 0
    fi

    $DOCKER compose up -d --build
    $DOCKER compose exec php composer create-project laravel/laravel .
}

init_frontend()
{
    if [ -f "./frontend/package.json" ]; then
        echo "frontend/package.json exists, skipping Vite init."
        return 0
    fi

    $DOCKER compose run --rm frontend sh -lc "npm create vite@latest . -- --template react"
}

composer_install()
{
    # Runs composer install in an ephemeral container (no need to start the stack).
    # This is intended to be executed BEFORE ./docker.sh -start on a fresh clone.
    $DOCKER compose run --rm --no-deps php sh -lc "\
      mkdir -p bootstrap/cache storage bootstrap/cache \
      && chmod -R 775 bootstrap/cache storage \
      && composer install --no-interaction --prefer-dist --optimize-autoloader"
}

frontend_install()
{
    # Runs npm install in an ephemeral container (no need to start the stack).
    # This is intended to be executed BEFORE ./docker.sh -start on a fresh clone.
    $DOCKER compose run --rm --no-deps frontend sh -lc "npm install"
}

install()
{
    composer_install || return 1
    frontend_install || return 1
}

fresh()
{
    $DOCKER stop $(docker ps -a -q) # Stops running containers
    $DOCKER rm $(docker ps -a -q) # Removes stopped containers (removes all containers)
    $DOCKER rmi $(docker images -q) # Removes all existing images
}

start_fresh()
{
    $DOCKER stop $(docker ps -a -q) # Stops running containers
    $DOCKER rm $(docker ps -a -q) # Removes stopped containers (removes all containers)
    $DOCKER rmi $(docker images -q) # Removes all existing images
    $DOCKER compose up -d # Build and start
}

stop()
{
    read -p "Press [Enter] key to exit..."
    if [ -z "$1" ]; then
        exit 1
    fi
}

if [ "$1" == "-fresh" ]; then
    fresh
    stop
fi

if [ "$1" == "-start-fresh" ]; then
    start_fresh
    stop
fi

if [ "$1" == "-start" ]; then
    start
    stop
fi

if [ "$1" == "-init-backend" ]; then
    init_backend
    stop
fi

if [ "$1" == "-init-frontend" ]; then
    init_frontend
    stop
fi

if [ "$1" == "-composer-install" ]; then
    composer_install
    stop
fi

if [ "$1" == "-frontend-install" ]; then
    frontend_install
    stop
fi

if [ "$1" == "-install" ]; then
    install
    stop
fi

if [ "$1" == "-stop" ]; then
    stop_stack
    stop
fi

DOCKER "$@" # Extra options for running docker commands
stop