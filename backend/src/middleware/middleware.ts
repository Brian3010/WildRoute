import { RequestHandler } from 'express';
import JWT from 'jsonwebtoken';
import passport from 'passport';
import { NewActivityBody } from '../@types/type-controller';
import AppError from '../utils/AppError';
import { getRedisToken } from '../utils/redis';
import { activitySchema } from './joiSchema';

// validate request.body
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

// authenticate using local strategy (IIFE)
export const authCheck: RequestHandler = (req, res, next) => {
  passport.authenticate('local', { session: false, passReqToCallback: true }, (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      throw new AppError('username and password not found (redirect to login)', 404);
    }
    if (info) {
      throw new AppError(info.message, 401);
    }
    // return;/
    req.user = user;
    next();
  })(req, res, next);
};

export const isLoggedIn: RequestHandler = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      throw new AppError(info.message || 'user not found', 404);
    }
    if (info) {
      throw new AppError(info.message, 401);
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const isTokenInBlackList: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader || authCheck.length === 0) {
    const token = req.headers.authorization!.startsWith('bearer ') && req.headers.authorization!.split(' ')[1];
    const result = await getRedisToken('tokens');
    if (result === JSON.stringify(token)) {
      throw new AppError('token exist in blacklist', 403);
    }
    next();
  } else {
    throw new AppError('Authorization not exist', 404);
  }
};

// export const isTokenInBlackList: RequestHandler = async (req, res, next) => {
//   // const user = req.user;
//   // console.log(user);
//   // get token from header
//   try {
//     if (req.get('Authorization')) {
//       const token = req.headers.authorization!.startsWith('bearer ') && req.headers.authorization!.split(' ')[1];
//       // if (!token) throw new AppError('Cannot valididate the token', 404);

//       const result = await getRedisToken('tokens');

//       if (result === JSON.stringify(token)) {
//         throw new AppError('token exist in blacklist', 500);
//       }

//       next();
//     } else {
//       throw new AppError('headers[Authorization] needed', 404);
//     }
//   } catch (err) {
//     next(err);
//   }
// };
