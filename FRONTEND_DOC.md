# Frontend Developer Documentation

This frontend is a small React app (Vite) that talks to the Laravel backend via JSON endpoints:

- Plain `fetch` calls (no extra HTTP client).
- A single, simple auth context (`AuthContext`) for login/logout/register state.
- Small reusable UI components for consistent forms/buttons/cards.
- Backend decides validation rules and messages (`success` + `message` envelope).

## Architecture and Design Pattern

**Pattern:** Page → `lib/*` API helper → Backend

- **Pages**: React Router routes + UI + minimal local state.
- **`lib/`**: tiny API wrappers around `fetch` that enforce the backend response envelope.
- **`features/auth`**: authentication state (Context API).
- **`components/ui`**: reusable UI building blocks (inputs, buttons, containers, cards).

### Request Flow (ASCII)

```
User action (click/submit)
   ↓
Page component
   ↓
lib/auth.js or lib/posts.js (fetch)
   ↓
Backend JSON response: { success, message, data }
   ↓
Page updates UI / shows message / navigates
```

## Project Structure

```
frontend/src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Container.jsx
│       ├── FormError.jsx
│       ├── TextInput.jsx
│       └── Textarea.jsx
├── features/
│   └── auth/
│       └── AuthContext.jsx
├── layouts/
│   └── AppLayout.jsx
├── lib/
│   ├── auth.js
│   └── posts.js
├── pages/
│   ├── Home.jsx
│   ├── Post.jsx
│   ├── CreatePost.jsx
│   ├── EditPost.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Logout.jsx
│   └── PageNotFound.jsx
├── App.jsx
└── main.jsx
```

## Backend Response Envelope (Important)

All frontend API helpers assume the backend returns:

```json
{
  "success": true,
  "message": "string",
  "data": {}
}
```

On failure, the backend returns at least:

```json
{
  "success": false,
  "message": "string"
}
```

### Error Handling Rule

- The frontend **does not invent default error messages**.
- If the backend returns an error `message`, we show it.
- If there is no backend message (e.g. network error), we show nothing.

## API Base URL

Both `lib/auth.js` and `lib/posts.js` use:

- `VITE_API_BASE_URL` (if provided)
- otherwise fallback to `http://localhost:8000`

## Authentication (Context API)

File: `frontend/src/features/auth/AuthContext.jsx`

The auth context stores:

- `loggedIn`: boolean
- `user`: object stored in `localStorage` (without token)

### Token Storage

- `localStorage.token`: the full Sanctum token string (e.g. `3|...`)
- `localStorage.user`: JSON string of `{ id, name, email, is_admin, created_at, updated_at }`

### Admin Badge

`Navbar` shows an “Admin” badge when:

- `user.is_admin === true`

## Routing (React Router)

Routes are defined in `frontend/src/App.jsx`:

- `/` → post list
- `/post/:id` → post detail (+ comments)
- `/post/new` → create post (authenticated)
- `/post/:id/edit` → edit post (authenticated)
- `/user/login` → login
- `/user/register` → register
- `/logout` → logout page (logs out, then redirects)

## Pages and What They Do

### `Home.jsx` (GET `/posts`)

- Loads and displays posts.
- Shows author using `post.name` returned by the backend.
- Displays a one-time “flash” message if navigation state contains `state.flash`.

### `Post.jsx` (GET `/posts/:id`)

- Loads a single post and renders:
  - post title/content
  - post author using `post.name`
  - comments list
- Comments are displayed in **created_at DESC** order.

#### Commenting (POST `/posts/:id/comments`)

- Guest users can comment.
- If a token exists, it is included so the backend can associate the comment to a user.

#### Deleting

- Delete post: authenticated, calls `DELETE /posts/:id`
- Delete comment: authenticated, calls `DELETE /comments/:id`

### `CreatePost.jsx` (POST `/posts`)

- Authenticated endpoint; sends Bearer token automatically if present.

### `EditPost.jsx`

- Loads edit data via `GET /posts/:id/edit`
- Saves via `PUT /posts/:id`

### `Login.jsx` / `Register.jsx`

- Login calls `POST /user/login` and stores token+user in localStorage.
- Register calls `POST /user/register` and then redirects to login.

### `Logout.jsx`

- Calls `logout()` (clears localStorage + context state)
- Redirects to `/` with a flash message.

## API Helpers

### `lib/auth.js`

- `login(email, password)`
- `register(name, email, password)`
- `logout()`
- `getToken()`, `isLoggedIn()`, `getStoredUser()`

### `lib/posts.js`

- `getPosts()`
- `getPost(id)`
- `getPostForEdit(id)`
- `createPost(title, content)`
- `updatePost(id, title, content)`
- `deletePost(id)`
- `createComment(postId, comment)` (guest allowed)
- `deleteComment(id)`

## Reusable UI Components

These are small “building blocks”, not a full design system:

- `Container`: standard max-width + padding
- `Card`: standard bordered white surface
- `TextInput`: standard input styling
- `Textarea`: standard textarea styling
- `Button`: primary / secondary / danger variants
- `FormError`: standard error message rendering

## How to Add a New Endpoint (Recommended Approach)

1. Add a small function to `lib/posts.js` or `lib/auth.js` (keep it simple).
2. Call it from the page with a `pending` + `error` state.
3. Show backend `message` in `FormError`.
4. If needed, redirect using React Router `navigate()`.

