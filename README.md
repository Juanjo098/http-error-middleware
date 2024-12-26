# http-error-middleware

`http-error-middleware` is a package that simplifies error handling in Express applications. It provides an easy way to generate and manage specific HTTP errors using middleware, making your code clearer and ensuring a consistent structure for error responses.

This package allows you to throw errors with specific HTTP status codes and custom messages, then handle them centrally in your application using a single middleware.

## Installation

You can install the package from npm using the following command:

```bash
npm install http-error-middleware
```

## Basic Usage

### Set Up Middleware in Your Express Application

First, you need to import and use the middleware provided by http-error-middleware in your Express app.

```typescript
import express from 'express'
// Import the package
import { httpErrorMiddleware } from 'http-error-middleware'

const app = express()

// Define your app routes.
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world' })
})

// Use the middleware to handle errors.
app.use(httpErrorMiddleware())
// If you want the error details to be placed at the root of the response body, set the "destructure" flag to true.
app.use(httpErrorMiddleware({ destructure: true }))
// Other middleware for handling errors can go here.

// Start the server.
app.listen(3000, () => {
  console.log('Server running')
})
```

### Throw Errors Where You Need Them

You can throw HTTP errors anywhere in your application using the HttpError class provided by the package. Here's a simple example to throw a 400 Bad Request error.

```typescript
import { HttpError } from 'http-error-middleware'

if (condition) HttpError.badRequest('Email and/or password are wrong')
```

This code will throw an error that gets handled by the middleware, and the response will look like this:

```json
{
  "message": "Email and/or password are wrong",
  "statusCode": 400
}
```

### Errors with Additional Details

If you need to send more details with the error (e.g., information about which form field is incorrect), you can do it like this:

```typescript
import { HttpError } from 'http-error-middleware'

if (condition) HttpError.badRequest('Email and/or password are wrong', { fieldName: "Error message", ...moreErrors })
```

This will generate a response with additional error details:

```json
{
  "message": "Email and/or password are wrong",
  "details": {
    "fieldName": "Error message",
    "fieldName2": "Error message"
  },
  "statusCode": 400
}
```

If you have the "destructure" flag set, the message will be displayed like this:

```json
{
  "message": "Email and/or password are wrong",
  "fieldName": "Error message",
  "fieldName2": "Error message"
  "statusCode": 400
}
```

## Available HTTP Error Methods

The package provides methods to generate common HTTP errors with specific status codes. Here are the available methods:

### Client Errors (4xx)

- `HttpError.badRequest(message: string, details?: object)`
  - Throws a `400 Bad Request` error with the provided message and optional details.
  
- `HttpError.unauthorized(message: string, details?: object)`
  - Throws a `401 Unauthorized` error with the provided message and optional details.
  
- `HttpError.paymentRequired(message: string, details?: object)`
  - Throws a `402 Payment Required` error with the provided message and optional details.
  
- `HttpError.forbidden(message: string, details?: object)`
  - Throws a `403 Forbidden` error with the provided message and optional details.
  
- `HttpError.notFound(message: string, details?: object)`
  - Throws a `404 Not Found` error with the provided message and optional details.
  
- `HttpError.methodNotAllowed(message: string, details?: object)`
  - Throws a `405 Method Not Allowed` error with the provided message and optional details.
  
- `HttpError.notAcceptable(message: string, details?: object)`
  - Throws a `406 Not Acceptable` error with the provided message and optional details.
  
- `HttpError.proxyAuthenticationRequired(message: string, details?: object)`
  - Throws a `407 Proxy Authentication Required` error with the provided message and optional details.
  
- `HttpError.requestTimeOut(message: string, details?: object)`
  - Throws a `408 Request Timeout` error with the provided message and optional details.
  
- `HttpError.conflict(message: string, details?: object)`
  - Throws a `409 Conflict` error with the provided message and optional details.

### Server Errors (5xx)

- `HttpError.internalServerError(message: string, details?: object)`
  - Throws a `500 Internal Server Error` with the provided message and optional details.
  
- `HttpError.notImplemented(message: string, details?: object)`
  - Throws a `501 Not Implemented` error with the provided message and optional details.
  
- `HttpError.badGateway(message: string, details?: object)`
  - Throws a `502 Bad Gateway` error with the provided message and optional details.
  
- `HttpError.serviceUnavailable(message: string, details?: object)`
  - Throws a `503 Service Unavailable` error with the provided message and optional details.
  
- `HttpError.gatewayTimeOut(message: string, details?: object)`
  - Throws a `504 Gateway Timeout` error with the provided message and optional details.

### Custom Error

- `HttpError.custom(message: string, statusCode: number, details?: object)`
  - Throws a custom error with a specified `statusCode` (for errors not covered by the predefined methods) and optional details.

Each of these methods generates a response with an appropriate HTTP status code, a message, and optionally, additional details.

## Benefits
Consistency: Centralize error handling in a single middleware.
Clarity: Easily create and throw HTTP errors with clear and specific messages.
Extensibility: Add additional details to errors to provide more context, such as information about specific fields.