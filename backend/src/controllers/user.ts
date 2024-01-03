require('dotenv').config();
import { RequestHandler } from 'express';
import User from '../models/user';
import AppError from '../utils/AppError';
import { deleteRedisToken, getRedisToken, setRedisToken } from '../utils/redis';
import { generateAccessToken, generateRefreshToken, generateResetPwdToken } from '../utils/tokenHandling';

import passport from 'passport';

import JWT from 'jsonwebtoken';
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

  const lowerCaseEmail = email.toLowerCase();

  const user = new User({ lowerCaseEmail, username });

  await User.register(user, password);

  const token = generateAccessToken<typeof user>(user);
  const refreshToken = generateRefreshToken(user);

  // store refresh to redis database
  await setRedisToken(refreshToken, user._id.toString());

  //res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
  // res.status(200).json({ accessToken, user: userTosend });
  res.status(200).json({ accessToken: token, refreshToken, message: 'redirect to other routes' });
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
  // send refreshToken as cookie
  // the option secure: true, can be set when in production, as  the cookie will only be sent over secure (HTTPS) connections.
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  res.status(200).json({ accessToken, user: userTosend });
};

type logoutBody = {
  token: string;
};

export const logoutUser: RequestHandler<unknown, unknown, logoutBody, unknown> = async (req, res) => {
  console.log(`${req.originalUrl} POST method`);
  const refreshToken = req.cookies.jwt || undefined;
  if (!refreshToken) throw new AppError('cookie not provided', 204);
  const result = await deleteRedisToken(req.user._id, refreshToken);

  // 0: successfully delete the refreshToken in dbs
  if (result === 0) {
    // clear cookie
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.status(200).json({ message: 'Successfully logout' });
  } else {
    throw new AppError(<string>result, 500);
  }
};

// interface refreshTokenBody {
//   refreshToken: string;
// }
export const refreshToken: RequestHandler<unknown, unknown, unknown, unknown> = async (req, res, next) => {
  console.log(`${req.originalUrl} GET method`);
  // const { refreshToken } = req.body;
  const refreshToken = req.cookies.jwt || undefined;

  if (!refreshToken) throw new AppError('cookie not provided', 400);
  // if (!isValidMongooseId(userId)) throw new AppError('id is not a mongoose valid id', 400);

  // verify the refreshToken
  JWT.verify(refreshToken, process.env.JWT_REFRESH_SECRET as JWT.Secret);

  // get token in the redis database
  const token = await getRedisToken(req.user._id);
  if (token === undefined) throw new AppError('undefined token', 404);
  if (token.length === 0) throw new AppError('There is no refreshToken in database (redirect to login)', 404);

  // compare 2 tokens to check valid refreshToken assigned to the user earlier.
  if (token !== refreshToken) throw new AppError('invalid refreshToken', 401);

  // delete token - setting to empty string
  await deleteRedisToken(req.user._id, refreshToken);

  // generate new tokens
  const newAccessToken = generateAccessToken(req.user);
  const newRefreshToken = generateRefreshToken(req.user);

  // set new refreshToken to the database
  await setRedisToken(newRefreshToken, req.user._id);

  // update the existing cookie
  res.cookie('jwt', newRefreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  // res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  res.status(200).json({ accessToken: newAccessToken });
};

// verify user email in forgot-password request for reseting password
export const verifyEmail: RequestHandler<unknown, unknown, { username: string; email: string }, unknown> = async (
  req,
  res
) => {
  const { email, username } = req.body;
  // console.log({ userEmail });
  if (!email || !username) throw new AppError('email and username in the body not found', 404);

  // find user with email
  const foundUser = await User.where('username', username.toLowerCase()).where('email', email.toLowerCase());
  console.log({ foundUser });
  if (foundUser.length <= 0) throw new AppError('the user is not exist in database', 404);

  // get token for reseting password - prevent access the reset-password api
  const user = foundUser[0]._id;
  const resetPasswordToken = generateResetPwdToken(user);

  // set cookie as it will be used for reseting password
  res.cookie('jwt', resetPasswordToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    expires: new Date(Date.now() + 10 * 60000),
  });
  res.json({ message: 'found the user - redirect to reset-password page' });
};

// reset password
export const resetPassword: RequestHandler<unknown, unknown, { newPassword: string }, unknown> = async (req, res) => {
  const { newPassword } = req.body;
  const user = req.user;

  // const foundUser = await User.findOne({
  //   _id: user._id,
  // });
  // if (!foundUser) throw new AppError('user not found', 404);

  // const foundUser = await User.findByUsername(user.username, true);
  // read this https://stackoverflow.com/questions/17828663/passport-local-mongoose-change-password

  res.json({ newPassword, user, foundUser });
};
