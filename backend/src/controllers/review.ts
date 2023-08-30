import { RequestHandler } from 'express';
import ActivityList from '../models/activities';
import Review from '../models/review';
import AppError from '../utils/AppError';

interface reviewParams {
  id?: string;
}

interface reviewBody {
  review: {
    body: string;
    rating: number;
  };
}

export const createReview: RequestHandler<reviewParams, unknown, reviewBody, unknown> = async (req, res) => {
  console.log(`${req.originalUrl} POST request`);
  const actyId = req.params.id;
  const review = req.body.review;

  // find the activity
  const acty = await ActivityList.findById(actyId).populate('reviews');
  if (!acty) throw new AppError('activity not found', 404);

  //create new review document
  const reviewDoc = new Review(review);
  reviewDoc.owner = req.user._id;

  //push review to activityList.reviews
  // acty.reviews!.push(reviewDoc.id);
  const numOfReviews = acty.reviews!.push(reviewDoc.id);

  if (acty.reviews) {
    let sum = 0;
    const copiedReviews = acty.reviews.slice(0, -1);
    console.log(
      'file: review.ts:36 ~ constcreateReview:RequestHandler<reviewParams,unknown,reviewBody,unknown>= ~ copiedReviews:',
      copiedReviews
    );

    for (let i = 0; i < copiedReviews.length; i++) {
      console.log(copiedReviews[i].rating);
      sum += copiedReviews[i].rating;
    }
    const totalRating = sum + Number(review.rating);
    const averageRating = Math.round(totalRating / numOfReviews);

    // save calculated rating to activity
    acty.rating = averageRating;
  }

  await acty.save();
  await reviewDoc.save();

  res.status(200).json({ reviewCreated: reviewDoc });
};

interface deleteReviewParams {
  id: string;
  reviewId: string;
}

// needed 2 ids because we want to remove the reference in the Activitylist
// * in delete review use this route activities/:id/review/passingReviewId
// * remember when delete review in dbs, make sure to delete the actual review and the one attached to the activityList.
export const deleteReview: RequestHandler<deleteReviewParams, unknown, unknown, unknown> = async (req, res) => {
  const { id, reviewId } = req.params;

  // delete reviewId from activity collection
  await ActivityList.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // find id in review and delete
  const review = await Review.findByIdAndDelete(reviewId);

  res.status(200).json({ reviewDeleted: review });
};
