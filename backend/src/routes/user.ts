import express, { Router } from 'express';
import * as userController from '../controllers/user';
import { authLoginInfo, isLoggedIn, isValidBody, validateRegister } from '../middleware/middleware';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
const router: Router = express.Router();

// *goal: register and login controller sign and send token, no need to use signUserJWT in the route handler.
router.route('/register').post(validateRegister, catchAsync(userController.registerUser));

// router.route('/login').post(authCheck, catchAsync(isTokenInBlackList), catchAsync(userController.loginUser));
router.route('/login').post(authLoginInfo, catchAsync(userController.loginUser));

//TODO: add reset password API
// this route verify the email and redirect to reset-password api
router.route('/forgot-password').post(catchAsync(userController.verifyEmail));

// reset password - validate the token before reseting password
router.route('/reset-password').post(isLoggedIn, catchAsync(userController.resetPassword));

router.route('/logout').get(isLoggedIn, catchAsync(userController.logoutUser));

// /refresh-token route to send new tokens
// router.route('/refresh-token').post(authLoginInfo, isValidBody, catchAsync(userController.refreshToken));
router.route('/refresh-token').post(
  isValidBody,
  (req, _res, next) => {
    const { _id, username } = req.body;
    const user = { _id, username };
    //attach _id and username to req, in order to process them in the next middleware
    req.user = user;
    return next();
  },
  catchAsync(userController.refreshToken)
);

// router.route('/cookies/:cookieName').put(userController.updateCookie);

export default router;
