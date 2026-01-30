## Blog Application (Headless)

This is a **headless blog** application:

- **Backend**: Laravel API-only (no server-rendered pages)
- **Frontend**: React (Vite) client app

The frontend talks to the backend via JSON endpoints using the response envelope:
`{ success: boolean, message: string, data: any }`.

## Docker Installation

### Prerequisites

- Docker Desktop installed and running
- On Windows: use **Git Bash** to run the `./*.sh` scripts

### Steps

1. Rename `env.example` → `.env` in the **project root**
2. Rename `backend/.env.example` → `backend/.env`
3. Rename `frontend/.env.example` → `frontend/.env`
4. Install dependencies (recommended on a fresh clone):

```bash
./docker.sh -install
```

5. Start the stack:

```bash
./docker.sh -start
```

This starts the Docker Compose stack (MySQL, PHP-FPM, Apache, frontend, phpMyAdmin).

To stop the stack:

```bash
./docker.sh -stop
```

6. Generate Laravel app key:

```bash
./artisan.sh key:generate
```

7. Run migrations + seed:

```bash
./artisan.sh migrate --seed
```

## Testing (Manual)

1. Open the frontend: `http://localhost:5173/`
2. Try the full flow:
   - Register
   - Login
   - Create / edit / delete your post
   - Add comments (guest users can comment too)
3. Logout, then test with an admin user:
   - **email**: `admin@example.com`
   - **password**: `password`

## Backend Tests

You can run backend tests from the project root:

```bash
./artisan.sh test
```

## Developer Documentation

- **Backend**: `BACKEND_DOC.md`
- **Frontend**: `FRONTEND_DOC.md`

## Policy (Who Can Do What)

- **Guest**
  - Can list posts and view a post
  - Can create comments (saved as guest when not logged in)
- **Authenticated user**
  - Can create posts
  - Can view the protected “edit” endpoint only for their own post
  - Can update / delete their own post
  - Can delete their own comments
- **Admin user**
  - Can delete any post
  - Can delete any comment

