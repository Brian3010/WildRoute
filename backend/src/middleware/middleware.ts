import { RequestHandler } from 'express';
import JWT from 'jsonwebtoken';
import { NewActivityBody } from '../@types/type-controller';
import AppError from '../utils/AppError';
import { activitySchema } from './joiSchema';

export const validateActivity: RequestHandler<unknown, unknown, NewActivityBody, unknown> = (req, res, next) => {
  const acty = req.body;
  if (!acty) throw new AppError('Cannot fetch data from body', 404);

  const { error } = activitySchema.validate(acty, { abortEarly: false });
  if (error) {
    const message = error.details.map(el => el.message).join(',');

    throw new AppError(message, 400);
  } else {
    next();
  }
};

export const signUserJWT: RequestHandler = (req, res, next) => {
  const user = req.user;

  // create token
  const token = JWT.sign(
    // payload
    {
      username: user.username,
    },
    // secret
    process.env.JWT_SECRET as JWT.Secret,
    {
      expiresIn: process.env.JWTEXPIRE,
      subject: user._id.toString(),
    }
  );
  // Send the token

  res.json({ token });
  // res.status(200).json({ username, email, id: user._id });
  // res.status(200).json(user);
};
