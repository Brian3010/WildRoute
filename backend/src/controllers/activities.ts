import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import ActivityList from '../models/activities';

export const index: RequestHandler = async (req, res) => {
  console.log('/activitites GET REQUEST');
  const actList = await ActivityList.find({});

  res.status(200).json(actList);
};

export const displayActivity: RequestHandler = async (req, res) => {
  console.log('/activities/:id GET REQUEST');

  const { id } = req.params;

  // could place this in a middleware
  if (!mongoose.isValidObjectId(id)) {
    const error = { message: 'Invalid Id' };
    return res.status(404).json(error);
  }

  const activity = await ActivityList.findById(id);

  if (!activity) {
    const error = { message: 'cannot find the activity' };
    return res.status(404).json(error);
  }

  return res.status(200).json(activity);
};
