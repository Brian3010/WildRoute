require('dotenv').config();
import { RequestHandler } from 'express';
import User from '../models/user';
import AppError from '../utils/AppError';
import { isValidMongooseId } from '../utils/isValidId';
import { deleteRedisToken, getRedisToken, setRedisToken } from '../utils/redis';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenHandling';

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

  const token = generateAccessToken<typeof user>(user);

  res.status(200).json({ accessToken: token });
};

export const loginUser: RequestHandler = async (req, res, next) => {
  console.log(`${req.originalUrl} POST method`);

  const user = req.user;

  const accessToken = generateAccessToken<typeof user>(user);
  const refreshToken = generateRefreshToken<typeof user>(user);

  // store token and userid to redis dbs
  console.log(user._id);
  await setRedisToken(refreshToken, user._id);

  const { salt, hash, ...userTosend } = user._doc; // ._doc contain user data
  res.status(200).json({ accessToken, refreshToken, user: userTosend });
};

type logoutBody = {
  token: string;
};

export const logoutUser: RequestHandler<unknown, unknown, logoutBody, unknown> = async (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) throw new AppError('Cannot fetch data from body', 404);
  const result = await deleteRedisToken(req.user._id, refreshToken);

  if (result === 0) {
    // 0: successfully delete the refreshToken in dbs
    res.status(200).json({ message: 'Successfully logout' });
  } else {
    throw new AppError(<string>result, 500);
  }

  //get token from redis dbs
  // const fetchToken = await getRedisToken(req.user._id);
  // if (!fetchToken) throw new AppError('refreshToken not found', 404);

  // const deletedToken = await deleteRedisToken(req.user._id, refreshToken);
  // console.log('deteteTOken ', typeof deletedToken);
  // if (deletedToken != 0) throw new AppError('cannot delete the token', 400);
  // res.status(200).json({ message: 'Successfully logout', deletedToken });
};

// todo: refreshToken route implementation
interface refreshTokenBody {
  userId: string;
  refreshToken: string;
}
export const refreshToken: RequestHandler<unknown, unknown, refreshTokenBody, unknown> = (req, res) => {
  const { refreshToken, userId } = req.body;
  if (!refreshToken || !userId) throw new AppError('token or id must be provided', 400);
  if (!isValidMongooseId(userId)) throw new AppError('id is not a mongoose valid id', 400);

  res.send('ok');
};

// ? refreshToken need to be send as header for checking valid token ?
