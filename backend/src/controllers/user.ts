require('dotenv').config();
import { RequestHandler } from 'express';
import User from '../models/user';
// export const index: RequestHandler = (req, res, next) => {
//   res.send('index from user');
// };

type UserBody = {
  user: {
    username: string;
    password: string;
    email: string;
  };
};

export const registerUser: RequestHandler<unknown, unknown, UserBody, unknown> = async (req, res, next) => {
  console.log(`${req.originalUrl} POST method`);

  const { email, username, password } = req.body.user;

  const user = new User({ email, username });
  await User.register(user, password);
  req.user = user;

  next();
};

// export const loginUser: RequestHandler = (req, res, next) => {
//   console.log(`${req.originalUrl} POST method`);

//   res.status(200).json(req.user);
// };

// todo: implement loggout feature delete token
// ? try to set token short expire duration for logout
export const logoutUser: RequestHandler = (req, res, next) => {
  // const token = req.header.authorizati
};

// // Assuming you have a JWT library such as 'jsonwebtoken' installed
// const jwt = require('jsonwebtoken');

// // Logout route handler
// app.post('/logout', (req, res) => {
//   // Assuming the token is sent in the request header as an 'Authorization' Bearer token
//   const token = req.headers.authorization.split(' ')[1];

//   // Create a new token with a short expiration time (e.g., 1 minute)
//   const shortExpiryToken = jwt.sign({ userId: req.user.id }, 'your_secret_key', { expiresIn: '1m' });

//   // Respond with the new token or a success message
//   res.json({ token: shortExpiryToken, message: 'Logged out successfully' });
// });
