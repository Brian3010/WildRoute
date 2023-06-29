import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import ActivityList from '../models/activities';
import AppError from '../utils/AppError';

export const index: RequestHandler = async (req, res, next) => {
  console.log('/activitites GET REQUEST');
  const actList = await ActivityList.find({});
  if (actList.length === 0) throw new AppError('Cannot fetch the activity list', 404);

  res.status(200).json(actList);
};

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
