import express, { Router } from 'express';
import * as activities from '../controllers/activities';
import { validateActivity } from '../middleware/middleware';
import catchAsync from '../utils/catchAsync';

const router: Router = express.Router();

router.route('/').get(catchAsync(activities.index)).post(validateActivity, catchAsync(activities.createActivity));

// router.route('/new').get(activities.renderActivityForm);

router.route('/:id').get(catchAsync(activities.displayActivity));

export default router;
