#!/bin/bash

# Examples
# ./frontend.sh -help
# ./frontend.sh install
# ./frontend.sh run dev
# ./frontend.sh run build

DOCKER="winpty docker"
SERVICE="frontend"

stop()
{
    read -p "Press [Enter] key to exit..."
    if [ -z "$1" ]; then
        exit 1
    fi
}

if [ -z "$1" ]; then
    echo "Usage: ./frontend.sh <npm args>"
    stop
fi

$DOCKER compose exec $SERVICE npm "$@"
stop
