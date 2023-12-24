import express, { Router } from 'express';
import * as reviewController from '../controllers/review';
import { isLoggedIn, isReviewAuthor, validateReview } from '../middleware/middleware';
import catchAsync from '../utils/catchAsync';

const router: Router = express.Router({ mergeParams: true }); // allow sub-router to get params from parent router

// route '/activities/:id/review'
// router.route('/').post(reviewController.createReview); // using this when we wanna chain http methods
router.post('/', isLoggedIn, validateReview, catchAsync(reviewController.createReview));

router.delete('/:reviewId', isLoggedIn, catchAsync(isReviewAuthor), catchAsync(reviewController.deleteReview));

export default router;
