import express, { RequestHandler, Router } from 'express';
import { NextFunction } from 'express-serve-static-core';
import passport from 'passport';
import * as userController from '../controllers/user';
import catchAsync from '../utils/catchAsync';
const router: Router = express.Router();

router.route('/register').post(catchAsync(userController.registerUser));

router.route('/login').post(
  passport.authenticate(
    'local',
    {
      failureMessage: 'Invalid Login Data',
      // failureRedirect: '/user/login',
      // failureFlash: true,
      passReqToCallback: true,
    },
    (err: any, user: any, info: any) => {
      // ! cannot get to the loginUser function, this authenicate wont generate any errors
    }
  ),
  userController.loginUser
);

export default router;
