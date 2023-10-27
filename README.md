# Task Management System - Backend

## Introduction

This README provides an overview of the backend components of our Task Management System built with NestJS, MongoDB, and Node.js.

## Authentication

### AuthService

The `AuthService` handles user authentication, registration, and JWT token generation.

- `signup(body: SignupDto)`: Registers a new user and returns the saved user data.
- `signIn(body: LoginUserDto)`: Authenticates a user, returns a JWT token upon successful login.

### Validation

i use class-validator for input validation in DTOs.

- `SignupDto`: Validates user registration data.
- `LoginUserDto`: Validates user login data.

### Dependencies

- `bcrypt` is used for hashing and comparing passwords.
- `jsonibtoken` is used for generating JWT tokens.
- `@nestjs/config` for configuration management.
- `@nestjs/mongoose` for MongoDB integration.

## User Management

### UserService

The `UserService` handles user-related operations.

- `findAllUsers(page: number, limit: number)`: Retrieves a list of users with optional pagination.
- `findUserById(id: string)`: Retrieves a user by ID.

## Task Management

### TaskService

The `TaskService` handles task-related operations.

- `createTask(body: CreateTaskDto, user: UserEntity)`: Creates a new task and associates it with a user.
- `getTasks(filter: GetTaskDto)`: Retrieves tasks based on filtering criteria.
- `findTaskByID(id: ObjectId)`: Retrieves a task by its ID.
- `deleteTask(id: ObjectId, user: UserEntity)`: Deletes a task if the user has the necessary permissions.
- `updateStatus(id: ObjectId, body: UpdateTaskStatusDto, user: UserEntity)`: Updates the status of a task if the user has the necessary permissions.
- `updateTitleDescription(id: ObjectId, body: UpdateTaskTitleDescriptionDto, user: UserEntity)`: Updates the title and description of a task if the user has the necessary permissions.

### Validation

i use class-validator for input validation in DTOs.

- `CreateTaskDto`: Validates task creation data.
- `GetTaskDto`: Validates task filtering parameters.
- `UpdateTaskStatusDto`: Validates task status updates.
- `UpdateTaskTitleDescriptionDto`: Validates task title and description updates.
- # Middleware, Decorators, Guards, and Pipes

In our Task Management System, i use various middleware, decorators, guards, and pipes to enhance the functionality and security of the application.

## Middleware

### CompressionMiddleware

The `CompressionMiddleware` uses the `compression` library to enable response compression, improving API performance. It allows for optional compression bypass using the `x-no-compression` header.

### CurrentUserMiddleware

The `CurrentUserMiddleware` handles user authentication and sets the authenticated user in the request object.

### GlobalErrorHandler

The `GlobalErrorHandler` is a custom exception filter to handle and format errors for API responses. It provides detailed error messages in development mode and generic error messages in production.

## Decorators

### CurrentUser

The `CurrentUser` decorator is a custom parameter decorator that retrieves the currently authenticated user from the request object. It can be used in controllers to access the user object easily.

## Guards

### AuthenticationGuard

The `AuthenticationGuard` is a custom guard that checks if a user is authenticated. It is used to secure routes and endpoints that require user authentication. It returns `true` if the user is authenticated and `false` otherwise.

## Pipes

### TaskStatutsValid

The `TaskStatutsValid` pipe is used to validate task status values. It ensures that the status provided in the request is one of the alloid status values (`TaskStatus.TODO`, `TaskStatus.IN_PROGRESS`, `TaskStatus.COMPLETED`). If an invalid status is provided, it throws a `BadRequestException`.

These middleware, decorators, guards, and pipes enhance the functionality and security of our Task Management System. They help us handle authentication, error responses, and input validation effectively.


### Dependencies

- `@nestjs/mongoose` for MongoDB integration.
- `class-validator` for input validation.

## Project Structure

my project follows the NestJS best practices for project organization and structure.

## Installation

To install and run the project, follow the instructions in the project's main README.

---

This README provides an overview of the backend components. For complete project setup and usage details, refer to the main project README.


- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- ibsite - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
