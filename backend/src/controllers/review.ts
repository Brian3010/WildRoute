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

  const reviewLength = acty.reviews!.push(reviewDoc.id);

  // calculate rating and add rating to the activitylist document
  if (acty.reviews) {
    let sum = 0;
    for (let i = 0; i < acty.reviews.length - 1; i++) {
      sum += acty.reviews[i].rating;
    }
    acty.rating = Math.round((sum + review.rating) / reviewLength);
  }

  // {
  //   _id: ObjectId("64c34f0188bb8afe5f28437e"),
  //   body: 'this is amazing',
  //   rating: 3,
  //   owner: ObjectId("64c0bfdd503dd1eda3269195"),
  //   __v: 0
  // }

  await reviewDoc.save();
  await acty.save();

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
