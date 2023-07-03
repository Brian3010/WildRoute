import { RequestHandler } from 'express';
import { extend } from 'joi';
import mongoose from 'mongoose';
import { normalize } from 'path';
import ActivityList from '../models/activities';
import { NewActivityBody } from '../types/type-controller';
import AppError from '../utils/AppError';

// utils function
const isValidId = (id: string) => mongoose.isValidObjectId(id);

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
  if (!isValidId(id)) {
    throw new AppError('Invalid Activity Id', 400);
  }

  const acty = await ActivityList.findById(id);
  if (!acty) {
    throw new AppError('Activity does not exist', 404);
  }

  return res.status(200).json(acty);
};

// render a form
// export const renderActivityForm: RequestHandler = (req, res) => {
//   console.log('/activities/new GET REQUEST');
//   res.redirect('');
// };

// create new actvity
export const createActivity: RequestHandler<unknown, unknown, NewActivityBody, unknown> = async (req, res, next) => {
  console.log('/activities POST REQUEST');
  const acty = req.body.activity;
  if (!acty) throw new AppError('Cannot fetch data from body', 400);
  const newActy = new ActivityList(acty);
  const savedActy = await newActy.save();

  res.status(200).json(savedActy);
  // res.send(activity);
};

// update activity
interface actyparams {
  id: string;
}

export const updateActy: RequestHandler<actyparams, unknown, NewActivityBody, unknown> = async (req, res, next) => {
  console.log('/activities/:id/edit PUT REQUEST');
  const actyId = req.params.id;
  if (!isValidId(actyId)) throw new AppError('Invalid Activity Id', 400);
  const acty = req.body.activity;
  if (!acty) throw new AppError('Cannot fetch data from body', 400);

  const resActy = await ActivityList.findByIdAndUpdate(actyId, { ...acty });

  res.status(201).json(resActy);
};

// delete an activity
export const deleteActy: RequestHandler<actyparams, unknown, NewActivityBody, unknown> = async (req, res, next) => {
  const actyId = req.params.id;
  if (!isValidId(actyId)) throw new AppError('Invalid Activity Id', 400);

  const resActy = await ActivityList.findByIdAndDelete(actyId);

  res.status(200).json(resActy);
};
