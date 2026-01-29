#!/bin/bash

# Examples
# ./docker.sh -help
# ./docker.sh -start
# ./docker.sh -start-fresh
# ./docker.sh -fresh
# ./docker.sh -dev
# ./docker.sh -dev-fresh
# ./docker.sh -init-backend
# ./docker.sh -init-frontend
# ./docker.sh -composer-install
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

dev()
{
    $DOCKER compose up -d
    $DOCKER compose up -d frontend
}

dev_fresh()
{
    fresh
    dev
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
    $DOCKER compose exec php composer install
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

if [ "$1" == "-dev" ]; then
    dev
    stop
fi

if [ "$1" == "-dev-fresh" ]; then
    dev_fresh
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

if [ "$1" == "-stop" ]; then
    stop_stack
    stop
fi

DOCKER "$@" # Extra options for running docker commands
stop