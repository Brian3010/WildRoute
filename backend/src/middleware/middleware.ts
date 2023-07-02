import { RequestHandler } from 'express';
import { NewActivityBody } from '../types/type-controller';
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
