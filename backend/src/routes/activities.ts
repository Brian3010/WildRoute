import express, { Router } from 'express';
import * as activities from '../controllers/activities';

const router: Router = express.Router();

router.route('/').get(activities.index);

router.route('/:id').get(activities.displayActivity);

export default router;
