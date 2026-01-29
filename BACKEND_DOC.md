# Backend Developer Documentation

This backend is an API-only Laravel application. It uses a layered design that keeps controllers thin and moves business logic into services and repositories. Responses are standardized via `ServiceResponse` DTOs and API Resources.

## Architecture and Design Pattern

**Pattern:** Controller → Service → Repository (+ DTO + Request + Resource)

- **Controller**: HTTP entry point; calls service and returns JSON.
- **Service**: business logic, orchestration, and response composition.
- **Repository**: database access only.
- **DTOs**: explicit data transfer objects for repository inputs.
- **Requests**: Form Request validation and messages.
- **Resources**: consistent response formatting.

### Request Flow (ASCII)

```
HTTP Request
   ↓
Controller
   ↓
Service
   ↓                 ↘
DTO(s) → Repository → Database
   ↓
Resource → ServiceResponse → JSON
```

## Project Structure (Laravel Layering)

```
app/
├── DTO/                           # Data Transfer Objects
│   ├── CreatePostData.php
│   ├── UpdatePostData.php
│   └── ServiceResponse.php
├── Http/
│   ├── Controllers/              # API Controllers
│   ├── Requests/                 # Form Request validation
│   └── Resources/                # API Resources
├── Models/                       # Eloquent models
├── Policies/                     # Authorization policies
├── Repositories/                 # Repository pattern
├── Services/                     # Business logic
└── Providers/                    # Service providers
```

## Key Components in This Project

- **Controllers**
  - `PostController`, `UserController`, `CommentController`
- **Services**
  - `PostService`, `UserService`, `CommentService`
- **Repositories**
  - `PostRepository`, `UserRepository`, `CommentRepository`
- **DTOs**
  - `CreatePostData`, `UpdatePostData`, `CreateCommentData`
- **Resources**
  - `PostResource`, `PostWithCommentsResource`, `UserResource`
- **Policies**
  - `PostPolicy`, `CommentPolicy`

## Authentication

- **Login** issues a Sanctum personal access token.
- **Protected routes** use `auth:sanctum` middleware.
- **Single-device tokens** are enforced by deleting previous tokens at login.

## Authorization

- **Policies** guard ownership-based access.
- **Admin support** is controlled by the `is_admin` boolean on `users`.
- Example (delete post): `user.is_admin || post.user_id === user.id`

## Example Flows

- **List posts**
  - `PostController@index` → `PostService@getPosts()` → `PostRepository@getPosts()`
- **Create post**
  - `PostController@store` → `PostService@createPost()` → `CreatePostData` → `PostRepository@createPost()`
- **Show post**
  - `PostController@show` → `PostService@showPost()` → `PostRepository@showPost()` → `PostWithCommentsResource`

## Testing

- **Feature tests** validate HTTP flows and authorization:
  - `PostAuthorizationTest`, `AdminDeleteTest`
- **Unit tests** focus on DTOs and DTO-like utilities:
  - `DtoTest`, `ServiceResponseTest`

## How to Extend with New Features

1. **Add Request** (validation).
2. **Add DTO** for inputs.
3. **Add Repository method** (DB-only).
4. **Add Service method** (business logic).
5. **Add Resource** if output needs shaping.
6. **Add Policy** if access rules are required.
7. **Add tests** (feature first, unit if needed).
