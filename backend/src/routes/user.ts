import express, { Router } from 'express';
import passport from 'passport';
import * as userController from '../controllers/user';
const router: Router = express.Router();

router.route('/').get(passport.authenticate('local'), userController.index);

export default router;
