# Docker Quick Start

## Start
- One command: `./docker.sh -dev`
- Fresh one command: `./docker.sh -dev-fresh`
- Init backend (Laravel 12): `./docker.sh -init-backend`
- Init frontend (Vite React): `./docker.sh -init-frontend`
- Manual start: `docker compose up -d --build`
- Frontend deps: `docker compose run --rm frontend npm ci`
- Backend deps: `docker compose exec php composer install`
- Artisan example: `./artisan.sh migrate`

## URLs
- Backend: http://localhost:8000
- Frontend: http://localhost:5173
- phpMyAdmin: http://localhost:8081

## Database
- Host: `db`
- User/Pass: from `.env`
- Root pass: `root`
