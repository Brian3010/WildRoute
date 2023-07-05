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
  const { email, username, password } = req.body.user;
  // save to the dbs
  const user = new User({ email, username });
  // use passport to register new user
  const newUser = await User.register(user, password);

  // todo: refer to <https://github.com/Brian3010/YelpCamp_pracs/blob/master/controllers/users.js>
};
