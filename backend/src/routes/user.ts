import express, { RequestHandler, Router } from 'express';
import passport from 'passport';
import * as userController from '../controllers/user';
import { signUserJWT } from '../middleware/middleware';
import catchAsync from '../utils/catchAsync';
const router: Router = express.Router();

router.route('/register').post(catchAsync(userController.registerUser), signUserJWT);

// todo: redirect bad request and unauthorize to error handling route
router.route('/login').post(passport.authenticate('local', { session: false }), signUserJWT);

export default router;
