#!/bin/bash

# Examples
# ./artisan.sh -help
# ./artisan.sh migrate
# ./artisan.sh migrate:fresh --seed

DOCKER_CONTAINER="laravel-app"
DOCKER_ARTISAN="winpty docker exec -it $DOCKER_CONTAINER php artisan"

stop(){
    read -p "Press [Enter] key to exit..."
    if [ -z "$1" ]; then
        exit 1
    fi
}

# Check if container is running
if [ ! "$(docker ps -q -f name=$DOCKER_CONTAINER)" ]; then
    echo "Container $DOCKER_CONTAINER is not running!"
    stop
fi

$DOCKER_ARTISAN "$@"
stop