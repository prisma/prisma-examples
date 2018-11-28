# REST API Example

This example shows how to implement a **REST (HTTP) API** using [gorilla/mux](http://www.gorillatoolkit.org/pkg/mux) and Prisma.

__INLINE(../_setup-1.md)__
cd prisma-examples/go/http-mux
__INLINE(../_setup-2.md)__

### 4. Start the REST API server

```
go run main.go
```

The server is now running on `http://localhost:8080`. You can send the API requests implemented in `main.go`, e.g. [`http://localhost:8080/feed`](http://localhost:8080/feed).

### 5. Using the REST API

#### GET

- `/post/:id`: Fetch a single post by its `id`
- `/feed`: Fetch all _published_ posts
- `/filterPosts?searchString={searchString}`: Filter posts by `title` or `content`

#### POST

- `/post`: Create a new post
  - Body:
    - `title: String` (required): The title of the post
    - `content: String` (optional): The content of the post
    - `authorEmail: String` (required): The email of the user that creates the post
- `/user`: Create a new user
  - Body:
    - `email: String` (required): The email address of the user
    - `name: String` (optional): The name of the user

#### PUT

- `publish/:id`: Publish a post by its `id`

#### DELETE
  
- `post/:id`: Delete a post by its `id`