import { RequestHandler } from 'express';
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

  // req.logIn(newUser, function (e) {
  //   if (e) return next(e);
  //   res.status(200).json({});
  // });

  // res.redirect('/user/register');

  res.status(200).json({ username, id: user._id });

  // todo: refer to <https://github.com/Brian3010/YelpCamp_pracs/blob/master/controllers/users.js>
};

export const loginUser: RequestHandler = (req, res, next) => {
  console.log(`${req.originalUrl} POST method`);

  res.status(200).json(req.user);
};
