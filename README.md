# Blog API

RESTful API for a multi-client blog platform with JWT authentication.

This is the backend component of a three-part blog system built for [The Odin Project](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api) curriculum. It serves both the [admin dashboard](https://github.com/cgrustas/blog-admin) for content management and the [public client](https://github.com/cgrustas/blog-client) for readers.

## Tech Stack

- **Runtime:** Node.js with Express 5
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT via Passport.js (local + JWT strategies)
- **Security:** bcryptjs for password hashing, CORS middleware package

## API Endpoints

### Authentication

| Method | Endpoint     | Description        | Auth |
| ------ | ------------ | ------------------ | ---- |
| POST   | `/tokens`    | Login, returns JWT | No   |
| POST   | `/users`     | Register new user  | No   |
| GET    | `/users/:id` | Get user details   | No   |
| DELETE | `/users/:id` | Delete account     | Yes  |

### Posts

| Method | Endpoint     | Description                               | Auth |
| ------ | ------------ | ----------------------------------------- | ---- |
| GET    | `/posts`     | List all posts                            | No   |
| GET    | `/posts/:id` | Get single post with comments             | No   |
| POST   | `/posts`     | Create new post                           | Yes  |
| PATCH  | `/posts/:id` | Update post (title, content, isPublished) | Yes  |
| DELETE | `/posts/:id` | Delete post                               | Yes  |

### Comments

| Method | Endpoint                      | Description           | Auth |
| ------ | ----------------------------- | --------------------- | ---- |
| GET    | `/posts/:postId/comments`     | List comments on post | No   |
| GET    | `/posts/:postId/comments/:id` | Get single comment    | No   |
| POST   | `/posts/:postId/comments`     | Add comment to post   | Yes  |
| PATCH  | `/posts/:postId/comments/:id` | Update comment        | Yes  |
| DELETE | `/posts/:postId/comments/:id` | Delete comment        | Yes  |

## Data Models

```
User
├── id: Int (primary key)
├── username: String (unique)
├── password: String (hashed)
├── role: USER | ADMIN
├── posts: Post[]
└── comments: Comment[]

Post
├── id: Int (primary key)
├── title: String
├── content: String?
├── isPublished: Boolean (default: false)
├── createdAt: DateTime
├── author: User
└── comments: Comment[]

Comment
├── id: Int (primary key)
├── content: String
├── createdAt: DateTime
├── author: User
└── post: Post
```

## Authentication Flow

1. Client sends credentials to `POST /tokens`
2. Server validates credentials and returns a JWT (expires in 1 hour)
3. Client includes JWT in `Authorization: Bearer <token>` header for protected routes
4. Server verifies JWT via Passport.js JWT strategy

## Related Repositories

- [blog-admin](https://github.com/cgrustas/blog-admin) - Admin dashboard for managing posts and comments
- [blog-client](https://github.com/cgrustas/blog-client) - Public-facing blog for readers
