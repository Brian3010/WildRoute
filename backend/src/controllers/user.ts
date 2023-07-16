require('dotenv').config();
import { error } from 'console';
import { RequestHandler } from 'express';
import JWT from 'jsonwebtoken';
import type { RedisClientType } from 'redis';
import { createClient } from 'redis';
import User from '../models/user';
import AppError from '../utils/AppError';
import { initializeRedis, setRedisToken, uninitializeRedis } from '../utils/redis';
// export const index: RequestHandler = (req, res, next) => {
//   res.send('index from user');
// };

// set up redis

// const redisClient = createClient(); // will need to specify an url for production ({url:...})

// redisClient.on('error', err => console.log('Redis Client Error', err));
// let redisClient: RedisClientType;
// (async () => {
//   redisClient = createClient();

//   redisClient.on('error', error => console.error(`Error : ${error}`));

//   await redisClient.connect();
// })();

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

export const logoutUser: RequestHandler = async (req, res, next) => {
  const user = req.user;
  console.log(user);
  // get token from header
  const token = req.headers.authorization!.startsWith('bearer ') ? req.headers.authorization!.split(' ')[1] : undefined;
  if (!token) throw new AppError('Cannot valididate the token', 404);

  const result = await setRedisToken('tokens', JSON.stringify(token));

  // res.status(200).json({ token, message: 'the token added to the blacklist' });
  res.status(200).json({ redisRes: result, message: 'Successfully added to the blacklist', tokenAdded: token });
};
