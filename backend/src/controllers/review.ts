import { RequestHandler } from 'express';

interface reviewParams {
  id: string;
}

// todo: create a new review and delete a review
// * in delete review use this route activities/:id/review/passingReviewId
// * remember when delete review in dbs, make sure to delete the actual review and the one attach to the activityList.

export const createReview: RequestHandler<reviewParams, unknown, unknown, unknown> = (req, res) => {
  console.log(`${req.originalUrl} POST request`);
  const actyId = req.params.id;
  res.send({ actyId });
};

// needed 2 ids because we want to remove the reference in the Activitylist
// delete reviewId in activty collection first using method pull in mongoose, then delete the one in review collection
