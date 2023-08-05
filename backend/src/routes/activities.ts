import express, { Router } from 'express';
import * as actyController from '../controllers/activities';
import { isAuthor, isLoggedIn, validateActivity } from '../middleware/middleware';
import catchAsync from '../utils/catchAsync';

const router: Router = express.Router();
router
  .route('/')
  .get(catchAsync(actyController.index))
  .post(isLoggedIn, validateActivity, catchAsync(actyController.createActivity));

router
  .route('/:id')
  .get(catchAsync(actyController.displayActivity))
  .put(isLoggedIn, catchAsync(isAuthor), validateActivity, catchAsync(actyController.updateActy))
  .delete(isLoggedIn, catchAsync(isAuthor), catchAsync(actyController.deleteActy));

// router.route('/new').get(actyController.renderActivityForm);

// ? would need this route to send back editing data to frontend
// router.route('/:id/edit').get(actyController)

export default router;
