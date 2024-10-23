## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

- `/post/:id`: Fetch a single post by its `id`
- `/feed?searchString={searchString}&take={take}&skip={skip}&orderBy={orderBy}`: Fetch all _published_ posts
  - Query Parameters
    - `searchString` (optional): This filters posts by `title` or `content`
    - `take` (optional): This specifies how many objects should be returned in the list
    - `skip` (optional): This specifies how many of the returned objects in the list should be skipped
    - `orderBy` (optional): The sort order for posts in either ascending or descending order. The value can either `asc` or `desc`s
- `/user/:id/drafts`: (protected) Fetch user's drafts by their `id`
- `/users`: Fetch all users

### `POST`

- `/post`: Create a new post
  - Body:
    - `title: String` (required): The title of the post
    - `content: String` (optional): The content of the post
    - `authorEmail: String` (required): The email of the user that creates the post
- `/signup`: Create a new user and session
  - Body:
    - `email: String` (required): The email address of the user
    - `password: String` (required): The email of the user
    - `posts: PostCreateInput[]` (optional): The posts of the user
- `/login`: Login into account and start a new session
  - Body:
    - `email: String` (required): The email address of the user
    - `password: String` (required): The email of the user
- `/logout`: Logs out the user and deletes the session

### `PUT`

- `/publish/:id`: Toggle the publish value of a post by its `id`
- `/post/:id/views`: Increases the `viewCount` of a `Post` by one `id`

### `DELETE`

- `/post/:id`: Delete a post by its `id`
