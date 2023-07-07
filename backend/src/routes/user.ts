import express, { RequestHandler, Router } from 'express';
import { NextFunction } from 'express-serve-static-core';
import passport from 'passport';
import * as userController from '../controllers/user';
import catchAsync from '../utils/catchAsync';
const router: Router = express.Router();

router.route('/register').post(catchAsync(userController.registerUser));

// ! error cannot pass the detect errors, trying to redirect to error handling route
router.route('/login').post(function (req, res, next) {
  passport.authenticate('local', function (err: any, user: any, info: any) {
    console.log(err);
    console.log(user);
    console.log(info);
    if (info) {
      return next(err);
    }
    next();
  })(req, res, next);
}, userController.loginUser);

export default router;
