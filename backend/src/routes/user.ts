import express, { Router } from 'express';
import * as userController from '../controllers/user';
import { authLoginInfo, isLoggedIn } from '../middleware/middleware';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
const router: Router = express.Router();

// *goal: register and login controller sign and send token, no need to use signUserJWT in the route handler.
router.route('/register').post(catchAsync(userController.registerUser));

// router.route('/login').post(authCheck, catchAsync(isTokenInBlackList), catchAsync(userController.loginUser));
router.route('/login').post(authLoginInfo, catchAsync(userController.loginUser));

router.route('/logout').get(isLoggedIn, catchAsync(userController.logoutUser));

export default router;
