import express, { Router } from 'express';
import * as userController from '../controllers/user';
import { authCheck, isLoggedIn, isTokenInBlackList, signUserJWT } from '../middleware/middleware';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
const router: Router = express.Router();

router.route('/register').post(catchAsync(userController.registerUser), signUserJWT);

router.route('/login').post(authCheck, isTokenInBlackList, signUserJWT);

router.route('/logout').get(isLoggedIn, catchAsync(userController.logoutUser));

export default router;
