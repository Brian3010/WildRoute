import express, { Router } from 'express';
import * as reviewController from '../controllers/review';

const router: Router = express.Router({ mergeParams: true }); // allow sub-router to get params from parent router

// route '/activities/:id/review'
// router.route('/').post(reviewController.createReview); // using this when we wanna chain http methods
router.post('/', reviewController.createReview);

export default router;
