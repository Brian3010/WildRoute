require('dotenv').config();
import { error } from 'console';
import { RequestHandler } from 'express';
import JWT from 'jsonwebtoken';
import User from '../models/user';
import AppError from '../utils/AppError';
import { setRedisToken } from '../utils/redis';
import { generateAccessToken } from '../utils/tokenHandling';

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
  const result = await User.register(user, password);
  const token = generateAccessToken<typeof result>(result);
  res.status(200).json({ accessToken: token });
};

// export const loginUser: RequestHandler = (req, res, next) => {
//   console.log(`${req.originalUrl} POST method`);

//   res.status(200).json(req.user);
// };

export const logoutUser: RequestHandler = async (req, res, next) => {
  const user = req.user;
  console.log(user);
  // get token from header
  const token = req.headers.authorization!.startsWith('bearer ') ? req.headers.authorization!.split(' ')[1] : undefined;
  if (!token) throw new AppError('Cannot valididate the token', 404);

  const result = await setRedisToken('tokens', JSON.stringify(token));

  // res.status(200).json({ token, message: 'the token added to the blacklist' });
  res.status(200).json({ redisResult: result, message: 'Successfully added to the blacklist', tokenAdded: token });
};
