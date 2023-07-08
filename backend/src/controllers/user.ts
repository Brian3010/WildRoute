require('dotenv').config();
import { RequestHandler } from 'express';
import JWT from 'jsonwebtoken';
import { PassportLocalErrorMessages } from 'mongoose';
import passport from 'passport';
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
  // save to the dbs
  const user = new User({ email, username });
  // use passport to register new user
  await User.register(user, password);

  // * signJWTForUser
  // ? refer to this link <https://github.com/Gurenax/express-mongoose-passport-jwt>
  const token = JWT.sign(
    // payload
    {
      username,
    },
    // secret
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWTEXPIRE,
      subject: user._id.toString(),
    }
  );
  // Send the token
  res.json({ token });
  // res.status(200).json({ username, email, id: user._id });
  // res.status(200).json(user);

  // todo: refer to <https://github.com/Brian3010/YelpCamp_pracs/blob/master/controllers/users.js>
};

export const loginUser: RequestHandler = (req, res, next) => {
  console.log(`${req.originalUrl} POST method`);

  res.status(200).json(req.user);
};
