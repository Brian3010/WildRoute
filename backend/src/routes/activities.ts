import express, { Router } from 'express';
import * as activities from '../controllers/activities';
import catchAsync from '../utils/catchAsync';

const router: Router = express.Router();

router.route('/').get(catchAsync(activities.index));

router.route('/:id').get(catchAsync(activities.displayActivity));

export default router;
