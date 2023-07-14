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
