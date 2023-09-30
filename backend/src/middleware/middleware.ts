import * as cloudinary from 'cloudinary';
import { Locals, RequestHandler } from 'express';
import JWT from 'jsonwebtoken';
import mongoose from 'mongoose';
import passport from 'passport';
import { NewActivityBody } from '../@types/type-controller';
import { handleCloudinaryMultiUpload } from '../cloudinary';

import ActivityList from '../models/activities';
import Review from '../models/review';
import AppError from '../utils/AppError';
import { getRedisToken } from '../utils/redis';
import { activitySchema, reviewSchema } from './joiSchema';

// parsing JSON data, submited by multipart/form-data method
// parsing JSON data and attach activity object to request body
//, so it can be used in the following middlewares
export const parsingMultiForm: RequestHandler<unknown, unknown, { jsonData: string }, unknown> = (req, res, next) => {
  try {
    const parsedActyBody = JSON.parse(req.body.jsonData);
    // attach activity data to body
    req.body = parsedActyBody; // body:{} = activity:{...} -- req.body.activity
  } catch (error) {
    throw new AppError('Cannot parse the body data, "actyData" must be in valid format', 422);
  }

  next();
};

// handle uploading file to Cloudinary
export const uploadCloudinaryFile: RequestHandler<unknown, unknown, unknown, unknown> = async (req, res, next) => {
  // convert req.file buffer in the parsed file to base64, and transform the file to a data URI
  // then, upload it using handleCloudinaryUpload
  // if (!req.file && !req.files) throw new AppError('image file key must be attached in the form', 400);
  if (!req.file && !req.files) {
    // req.imageFiles = [{url:'',fileName:''}]

    return next();
  }

  // create array of base64 => [base64]
  const dataURIArr = Object.entries(req.files!).map(f => {
    let b64 = Buffer.from(f[1].buffer).toString('base64');
    return `data:${f[1].mimetype};base64,${b64}`;
  });

  const cldRes = (await handleCloudinaryMultiUpload(dataURIArr)) as cloudinary.UploadApiResponse[];
  // res.send({cldRes });

  // attach created cloudinary file into request
  req.imageFiles = cldRes.map(cR => {
    return { fileName: cR.public_id, url: cR.secure_url };
  });

  next();
};

// validate request.body
export const validateActivity: RequestHandler<unknown, unknown, NewActivityBody, unknown> = (req, res, next) => {
  const acty = req.body;
  // console.log({ bodyInValidateAcitivity: req.body.activity });

  if (!acty) throw new AppError('Cannot fetch data from body', 404);

  const { error } = activitySchema.validate(acty, { abortEarly: false });
  if (error) {
    const message = error.details.map((el: { message: string }) => el.message).join(',');

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
      throw new AppError('Incorrect username and password', 404);
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
  console.log('isLoggedIn middleware');
  passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // console.log('infor: ', info);
      throw new AppError(info.message || 'user not found', 403);
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

  if (acty.author!.toString() !== userId) throw new AppError('You donot own this activity', 401);

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
