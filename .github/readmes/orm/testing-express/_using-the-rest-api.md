## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

- `/user`: Fetch all users

### `POST`

- `/user`: Create a new user
  - Body:
    - `email: String` (required): The email address of the user
    - `name: String` (optional): The name of the user
