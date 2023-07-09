import express, { RequestHandler, Router } from 'express';
import passport, { AuthenticateCallback } from 'passport';
import * as userController from '../controllers/user';
import { authCheck, signUserJWT } from '../middleware/middleware';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
const router: Router = express.Router();

router.route('/register').post(catchAsync(userController.registerUser), signUserJWT);

// todo: redirect bad request and unauthorize to error handling route

router.route('/login').post(authCheck, signUserJWT);

export default router;
