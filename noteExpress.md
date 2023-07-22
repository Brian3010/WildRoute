# Note

## summary of the key concepts related to error handling and middleware in Express

1. Error Handling Middleware:
   - Error handling middleware in Express is responsible for handlin error that occur during the request-response cycle.
   - It is defined using the `app.use()` method with a middleware function that accepts four parameters: `err`, `req`, `res`, and `next`.
   - The error handling middleware should be defined after all other route handlers and middleware in your application.
   - It is invoked when an error occurs in any previous middleware or route handler.
   - Example:

     ```javascript
     app.use((err, req, res, next) => {
       // Handle the error
       res.status(500).json({ error: err.message });
     });
     ```

2. Middleware Execution:
   - Middleware functions are executed in the order they are defined using `app.use()` or `app.METHOD()` methods.
   - Each middleware function receives three parameters: `req` (request), `res` (response), and `next` (next middleware function).
   - The `next` function is used to pass control to the next middleware function in the chain.
   - To pass an error to the error handling middleware, call `next` with an error parameter: `next(error)`.
   - Example:

     ```javascript
     app.use((req, res, next) => {
       // Perform some middleware logic
       if (/* some condition */) {
         const error = new Error('Error message');
         next(error); // Pass the error to the error handling middleware
       } else {
         next(); // Continue to the next middleware
       }
     });
     ```

3. Route Handlers:
   - Route handlers are responsible for handling specific HTTP requests.
   - They are defined using the `app.METHOD()` methods (`app.get()`, `app.post()`, etc.).
   - Route handlers can also have middleware functions as additional parameters, which are executed before the route handler itself.
   - To pass an error to the error handling middleware from a route handler, call `next` with an error parameter: `next(error)`.
   - Example:

     ```javascript
     app.get('/example', (req, res, next) => {
       // Some condition that indicates an error
       if (/* condition */) {
         const error = new Error('Error message');
         next(error); // Pass the error to the error handling middleware
       } else {
         // Normal processing
         res.send('Success');
       }
     });
     ```

4. Error Object:
   - When creating an error object, you can provide an optional error message as a string or use the `Error` constructor without an argument.
   - Example:

     ```javascript
     const error = new Error('Error message');
     ```

Remember that proper error handling is crucial for robust Express applications. By defining error handling middleware and using the `next` function to pass errors, you can centralize your error handling logic and provide appropriate responses to clients when errors occur during the request processing flow.

## AppError Class

The `AppError` class is a custom error class that extends the built-in `Error` class. It allows you to create custom error instances with additional properties such as `message` and `status`.

### Constructor

#### Parameters

- `message` (string): The error message describing the error.
- `status` (number): The HTTP status code associated with the error.

#### Example

```javascript
class AppError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}
```

### Usage

#### Throwing an `AppError` Instance

You can throw an instance of `AppError` to signal a specific error condition in your application. By providing a custom error message and status code, you can convey detailed information about the error.

```javascript
throw new AppError('Resource not found', 404);
```

#### Error Handling

To handle errors thrown by the `AppError` class, you can define an error handling middleware in your Express application. The error handling middleware will receive the error as the first parameter, allowing you to access its properties and handle it accordingly.

```javascript
app.use((err, req, res, next) => {
  // Check if the error is an instance of AppError
  if (err instanceof AppError) {
    // Handle the error based on its properties
    res.status(err.status).json({ error: err.message });
  } else {
    // Handle other types of errors
    // ...
  }
});
```

In the above example, if the thrown error is an instance of `AppError`, it will be recognized in the error handling middleware. You can then extract the error properties (`message` and `status`) and handle the error accordingly, such as sending an appropriate HTTP response with the error message and status code.

### Summary

The `AppError` class allows you to create custom error instances with specific properties. By extending the `Error` class, it inherits the behavior and properties of the base `Error` class, making it recognizable as an error object. You can use the `AppError` class to throw and handle custom errors in your Express application, providing detailed information about the error and handling it appropriately in error middleware or handlers.

Note: It's important to handle errors appropriately in your application and define error middleware or handlers to catch and respond to errors in a consistent and meaningful way.

## Error Handling of throw new Error and next(error)

1. Errors in synchronous code: When an error occurs in synchronous code within a route handler or middleware function, you can simply throw an error using `throw new Error()`. Express will automatically catch and handle the error for you. You don't need to do anything extra to ensure that the error is processed correctly.

    Example:

    ```javascript
    app.get('/', (req, res) => {
      throw new Error('This is a synchronous error');
    });
    ```

2. Errors in asynchronous code: When an error occurs in asynchronous code, such as within a Promise or a callback function, you need to pass the error to the `next()` function. This allows Express to catch and handle the error. You should pass the error object as an argument to `next()`.

    Example:

    ```javascript
    app.get('/', (req, res, next) => {
      someAsyncFunction()
        .then(result => {
          // Handle the result
        })
        .catch(error => {
          next(error); // Pass the error to Express
        });
    });
    ```

By passing the error to the `next()` function, Express will automatically route the error to the error-handling middleware you've defined. This middleware should be defined with four parameters `(err, req, res, next)` to handle errors.

Example error handling middleware:

```javascript
app.use((err, req, res, next) => {
  // Handle the error
  res.status(500).json({ error: err.message });
});
```

In summary, when dealing with synchronous errors, you can simply throw the error, and Express will handle it. For asynchronous errors, you need to pass the error to the `next()` function, and Express will route it to the error-handling middleware.

## Create User with Passport

1. Install Dependencies: Start by installing the required dependencies. You'll need `passport`, `passport-local`, and `passport-local-mongoose`. You can install them using npm or yarn:

   ```bash
   npm install passport passport-local passport-local-mongoose
   ```

2. Setup User Model: Create a User model in your Mongoose schema. You can use `passport-local-mongoose` to add the necessary fields and methods for authentication. Here's an example:

   ```javascript
   const mongoose = require('mongoose');
   const passportLocalMongoose = require('passport-local-mongoose');

   const userSchema = new mongoose.Schema({
     // Other user fields
   });

   userSchema.plugin(passportLocalMongoose);

   const User = mongoose.model('User', userSchema);

   module.exports = User;
   ```

   The `passportLocalMongoose` plugin will add a username, hashed password, and additional methods to the User schema.

3. Configure Passport: Initialize and configure Passport.js in your application. You'll need to set up the local strategy and serialize/deserialize user functions. Here's an example:

   ```javascript
   // Passport configuration
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });
    passport.deserializeUser(User.deserializeUser());
    app.use(passport.initialize());
    app.use(passport.session());
   ```

4. User Registration: To register a new user, you can use the `register` method provided by `passport-local-mongoose`. Here's an example:

   ```javascript
   const User = require('./models/user'); // Replace with the path to your User model

   const newUser = new User({ username: 'john', email: 'john@example.com' });

   User.register(newUser, 'password123', (err, user) => {
     if (err) {
       // Handle registration error
     } else {
       // User registered successfully
     }
   });
   ```

   The `register` method will automatically hash the password and store the user in the database.

5. User Authentication: To authenticate a user, you can use the `authenticate` method provided by `passport-local-mongoose`. Here's an example:

   ```javascript
   const passport = require('passport');
   const User = require('./models/user'); // Replace with the path to your User model

   app.post('/login', passport.authenticate('local'), (req, res) => {
     // User authenticated successfully
   });
   ```

   The `passport.authenticate` middleware will handle the authentication process.

These are the basic steps to get started with `passport-local-mongoose`. Remember to configure your database connection, set up routes, and handle any errors or additional functionalities as needed.

For more advanced features and customization options, refer to the `passport-local-mongoose` documentation: [https://github.com/saintedlama/passport-local-mongoose](https://github.com/saintedlama/passport-local-mongoose).

## JWT Token management

### `/Login` POST route

- Sign `accessToken` and `refreshToken` and send them back to the client.
- Store `refreshToken` in redis database. (along with userId?)

### `isLoggedIn / verify` middleware (used to validate the accessToken on protected routes to ensure that the user is authenticated)

- Use `accessToken` information like secret token to `jwt.verify`

### `/logout` POST route

- Include `isLoggedIn/verify` middleware in the route.
- Attach `refreshToken` with the request using JSON.
- Check if the `refreshToken` is in redis database.
- Delete `refreshToken` from the database to invalidate it and prevent it from being used again.

### `/refreshToken` POST route

- Attach the `refreshToken` in the request as JSON.
- Check if `refreshToken` has been passed.
- Check if the `refreshToken` is in the database, if not, return error.
- If yes, `JWT.verify` the `refreshToken` (using refresh token secret).
- Get token in the redis database, the one we store earlier.
- Compare the refreshToken with the one in the database to check valid.
- Delete `refreshToken` from the database to invalidate it and prevent it from being used again.
- Generate new `accessToken` and `refreshToken`, add `refreshToken` (along with userId?) to the redis database.
- Set new refreshToken to the database
- Send `refreshToken` and `accessToken` to the client.

## Implenment token in frontend

1. Create API Endpoints:
Set up the backend API endpoints for user registration, login, logout, and token refreshing

2. User Registration:
In the React app, create a user registration form where users can provide their credentials (e.g., email and password). When the form is submitted, make a POST request to the backend `/register` route to create a new user account. The backend will respond with access and refresh tokens, which you should store securely in the client.

3. User Login:
Similarly, create a login form where users can enter their credentials. Upon submission, make a POST request to the backend `/login` route to authenticate the user. If the login is successful, the backend will respond with access and refresh tokens, which you should store securely in the client.

4. Secure Access:
For protected routes in your React app (routes that require the user to be logged in), attach the access token to the Authorization header of your HTTP requests. You can use a library like Axios to manage your HTTP requests and add the access token to each request.

5. Token Expiration Handling:
When the access token expires (usually after a short period), the backend API will return a 401 Unauthorized response. Your frontend should catch this response and trigger the token refresh mechanism.

6. Token Refresh:
When you receive a 401 Unauthorized response from the backend, it's time to refresh the access token. Make a request to the `/refreshToken` route in your backend, passing the refresh token stored in your client's local storage or cookies.

7. Logout:
Create a logout functionality in your React app. When the user clicks the logout button, make a request to the `/logout` route on the backend. This route should invalidate the refresh token stored in the Redis database and perform any other necessary cleanup.

8. Token Storage:
Use secure methods to store the access and refresh tokens in the client. Common options include using HTTP-only cookies for the refresh token and storing the access token in the application state (e.g., Redux or React context). Avoid storing tokens in local storage or cookies accessible from JavaScript to prevent potential security risks.

9. Error Handling:
Implement error handling throughout your React app to handle scenarios like invalid tokens, network errors, or failed requests. Properly handle token expiration and use the token refresh mechanism when necessary.

