import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import ActivityList from '../models/activities';
import AppError from '../utils/AppError';

// show a list of activities
export const index: RequestHandler = async (req, res, next) => {
  console.log('/activitites GET REQUEST');
  const actList = await ActivityList.find({});
  if (actList.length === 0) throw new AppError('Cannot fetch the activity list', 404);

  res.status(200).json(actList);
};

// show activity's details
export const displayActivity: RequestHandler = async (req, res, next) => {
  console.log('/activities/:id GET REQUEST');

  const { id } = req.params;
  // could place this in a middleware
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError('Invalid Activity Id', 400);
  }

  const activity = await ActivityList.findById(id);
  if (!activity) {
    throw new AppError('Activity does not exist', 404);
  }

  return res.status(200).json(activity);
};

// render a form
// export const renderActivityForm: RequestHandler = (req, res) => {
//   console.log('/activities/new GET REQUEST');
//   res.redirect('')
// }

// create new actvity
interface NewActivityBody {
  activity: {
    activity_title: string;
    location: string;
    description: string;
    avg_price: number;
    image: Array<{
      url: string;
      // filename: string;
    }>;
  };
}

//
export const createActivity: RequestHandler<unknown, unknown, NewActivityBody, unknown> = async (req, res, next) => {
  console.log('/activities POST REQUEST');
  const activity = req.body.activity;
  if (!activity) throw new AppError('Cannot fetch data submitted', 400);

  const newActivity = new ActivityList(activity);
  await newActivity.save();

  res.status(200).json(activity);
  // res.send(activity);
};
