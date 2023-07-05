import express, { Router } from 'express';
import passport from 'passport';
import * as userController from '../controllers/user';
const router: Router = express.Router();

router.route('/').get(userController.registerUser);

export default router;
