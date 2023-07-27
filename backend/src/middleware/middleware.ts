import { RequestHandler } from 'express';
import JWT from 'jsonwebtoken';
import mongoose from 'mongoose';
import passport from 'passport';
import { NewActivityBody } from '../@types/type-controller';
import ActivityList from '../models/activities';
import Review from '../models/review';
import AppError from '../utils/AppError';
import { getRedisToken } from '../utils/redis';
import { activitySchema, reviewSchema } from './joiSchema';

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

// validate review body
interface reviewBody {
  review: {
    body: string;
    rating: number;
  };
}
export const validateReview: RequestHandler<unknown, unknown, reviewBody, unknown> = (req, res, next) => {
  console.log(`${req.originalUrl} validateReview() middleware`);
  const reviewbody = req.body;
  if (!reviewbody) throw new AppError('missing reviews body', 400);

  const { error } = reviewSchema.validate(reviewbody, { abortEarly: false });
  if (error) {
    const message = error.details.map(el => el.message).join(',');

    throw new AppError(message, 400);
  } else {
    next();
  }
};

// check if empty body
export const isValidBody: RequestHandler = (req, res, next) => {
  //check empty
  if (Object.keys(req.body).length === 0) throw new AppError('the body is empty', 404);

  next();
};

// authenticate using local strategy (IIFE)
export const authLoginInfo: RequestHandler = (req, res, next) => {
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

// check valid accessToken
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
    // console.log('req.user: ', user);
    next();
  })(req, res, next);
};

// check if author of an activity
interface actyparams {
  id: string;
}
export const isAuthor: RequestHandler<actyparams, unknown, unknown, unknown> = async (req, res, next) => {
  const userId = req.user._id.toString() || undefined;
  const actyId = req.params.id || undefined;

  if (!userId || !actyId) throw new AppError('undefined ids', 404);

  const acty = await ActivityList.findById(actyId);
  if (!acty) throw new AppError('Activity not found', 404);

  if (acty.author.toString() !== userId) throw new AppError('You donot own this activity', 401);

  next();
};

// check if owner of a review

interface reviewParams {
  reviewId: string;
}
export const isReviewAuthor: RequestHandler<reviewParams, unknown, unknown, unknown> = async (req, res, next) => {
  console.log(`${req.originalUrl} isReviewAuthor Middleware`);
  const { reviewId } = req.params;

  // find review by id
  const review = await Review.findById(reviewId);
  if (!review) throw new AppError('Cannot find the review', 404);

  if (JSON.stringify(review.owner) !== JSON.stringify(req.user._id)) {
    throw new AppError('You do not have permission to delete this review', 401);
  }

  next();
};

// export const isTokenInBlackList: RequestHandler = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader || authCheck.length === 0) {
//     const token = req.headers.authorization!.startsWith('bearer ') && req.headers.authorization!.split(' ')[1];
//     const result = await getRedisToken('tokens');
//     if (result === JSON.stringify(token)) {
//       throw new AppError('token exist in blacklist', 403);
//     }
//     next();
//   } else {
//     throw new AppError('Authorization not exist', 404);
//   }
// };

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
