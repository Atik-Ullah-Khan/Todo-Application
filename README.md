# Simpto API Documentation

Welcome to the API documentation for the Simpto. Simpto is a Todo Applicaion. This documentation provides information about the endpoints, request formats, and responses that you can use to interact with the Simpto Todo App's backend.

## Getting Started

To get started, you'll need to have an account on the Simpto Todo App. If you don't have one, you can sign up using the [Signup endpoint](#signup).

## Authentication

All endpoints, except for the [Login](#login) and [Signup](#signup) endpoints, require authentication. You need to include a valid JWT token in the `Authorization` header of your requests.

## Endpoints

### Login

Endpoint: `POST /api/user/login`

Login with your registered email and password. You'll receive a JWT token that you can use for authentication.

Example Request:

```http
POST /api/user/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}
```

### Signup

Endpoint: `POST /api/user/signup`

Create a new user account.

Example Request:

```http
POST /api/user/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "your_password"
}
```

### Forget Password

Endpoint: `POST /api/user/forget-password`

Request a password reset link to be sent to your email.

Example Request:

```http
POST /api/usre/forget-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Reset Password

Endpoint: `POST /api/user/reset-password`

Reset your password using the reset token and new password.

Example Request:

```http
POST /api/user/reset-password
Content-Type: application/json

{
  "userId": "user_id_here",
  "token": "reset_token_here",
  "password": "new_password_here"
}
```

### Get Todo

Endpoint: `GET /api/todo`

Retrieve a list of all todo items.

Example Request:

```http
GET /api/todo
Authorization: Bearer your_jwt_token
```

### Create Todo

Endpoint: `POST /api/todo`

Create a new todo item.

Example Request:

```http
POST /api/todo
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "title": "Finish Project Milestone",
  "description": "Complete the tasks and meet the milestones for the project.",
  "priority": "medium",
}

```

### Update Todo

Endpoint: `PATCH /api/todo`

Check or uncheck a todo item.

Example Request:

```http
PATCH /api/todo
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
   "_id": "64d220611f7f03d5b38a2da4",
   "completed": true
}
```

```http
PATCH /api/todo
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
   "_id": "64d220611f7f03d5b38a2da4",
   "description": "Complete the tasks to unlock new achivement.",
   "priority": "high",

}
```

### Delete Todo

Endpoint: `DELETE /api/todo`

Delete a todo item.

Example Request:

```http
DELETE /api/todo
Authorization: Bearer your_jwt_token

{
   "_id": "64d220611f7f03d5b38a2da4",
}
```

###Response Formats
Responses from the API are typically in JSON format. The structure includes `status`, `message` and others relavent fields.

✅ Example Response:

```http
GET /api/todo
Authorization: Bearer your_jwt_token
```

```json
{
  "status": 200,
  "message": "todos fetched successfully.",
  "todos": [
    {
      "_id": "64d285034bfefaef8ff995f4",
      "userId": "1691496227599",
      "title": "Finish Book Chapter",
      "description": "Complete writing the last chapter of the novel before the deadline.",
      "priority": "normal",
      "completed": false,
      "createdAt": "2023-08-08T18:10:11.067Z",
      "updatedAt": "2023-08-08T18:10:35.579Z"
    },
    {
      "_id": "64d284c24bfefaef8ff995f0",
      "userId": "1691496227599",
      "title": "Buy Groceries",
      "description": "Purchase fruits, vegetables, and other essentials for the week.",
      "priority": "low",
      "completed": false,
      "createdAt": "2023-08-08T18:09:06.702Z",
      "updatedAt": "2023-08-08T18:09:06.702Z"
    },
    {
      "_id": "64d284554bfefaef8ff995ec",
      "userId": "1691496227599",
      "title": "Prepare Presentation",
      "description": "Create a compelling presentation for the upcoming client meeting.",
      "priority": "high",
      "completed": false,
      "createdAt": "2023-08-08T18:07:17.841Z",
      "updatedAt": "2023-08-08T18:10:16.798Z"
    },
    {
      "_id": "64d220611f7f03d5b38a2da4",
      "userId": "1691496227599",
      "title": "Make it responsive",
      "description": "You should make this application fully responsive.",
      "priority": "medium",
      "completed": false,
      "createdAt": "2023-08-08T11:00:49.591Z",
      "updatedAt": "2023-08-08T18:07:45.607Z"
    }
  ]
}
```

❌ Example Response:

```http
POST /api/user/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}
```

```json
{
  "status": 400,
  "message": "invalid email or password"
}
```

### License

This project is licensed under the MIT License. You can use this project as you like.

Please replace placeholders like `your_jwt_token`, `your_username`, and others with the actual values relevant to your app. Customize the descriptions and examples to match your API's behavior.
