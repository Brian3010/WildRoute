import { RequestHandler } from 'express';
import { NewActivityBody } from '../@types/type-controller';
import ActivityList from '../models/activities';
import AppError from '../utils/AppError';
import { isValidMongooseId } from '../utils/isValidId';

// show a list of activities
export const index: RequestHandler = async (req, res, next) => {
  console.log('/activitites GET REQUEST');
  // todo-1: the following code will list a portion of documents
  // const actList = await ActivityList.find().skip(0).limit(2);
  const actList = await ActivityList.find();
  if (actList.length === 0) throw new AppError('Cannot fetch the activity list', 404);

  res.status(200).json(actList);
};

// show activity's details
export const displayActivity: RequestHandler = async (req, res, next) => {
  console.log('/activities/:id GET REQUEST');

  const { id } = req.params;
  // could place this in a middleware
  if (!isValidMongooseId(id)) {
    throw new AppError('Invalid Activity Id', 400);
  }

  const acty = await ActivityList.findById(id).populate('author').populate('reviews');
  if (!acty) throw new AppError('Activity does not exist', 404);
  if (!acty.populated) throw new AppError('Cannot populate the data', 400);

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

  // acty.au = req.user._id; // updated type in type folder
  const newActy = new ActivityList(acty);
  // add user as author
  newActy.author = req.user._id;

  const savedActy = await newActy.save();

  res.status(200).json(savedActy);
  // res.send(req.user);
};

// update activity
interface actyparams {
  id: string;
}

export const updateActy: RequestHandler<actyparams, unknown, NewActivityBody, unknown> = async (req, res, next) => {
  console.log('/activities/:id/edit PUT REQUEST');
  const actyId = req.params.id;
  if (!isValidMongooseId(actyId)) throw new AppError('Invalid Activity Id', 400);
  const acty = req.body.activity;
  if (!acty) throw new AppError('Cannot fetch data from body', 400);

  const resActy = await ActivityList.findByIdAndUpdate(actyId, { ...acty }, { returnDocument: 'after' });

  res.status(201).json(resActy);
};

// delete an activity
export const deleteActy: RequestHandler<actyparams, unknown, NewActivityBody, unknown> = async (req, res, next) => {
  const actyId = req.params.id;
  if (!isValidMongooseId(actyId)) throw new AppError('Invalid Activity Id', 400);

  const resActy = await ActivityList.findByIdAndDelete(actyId);

  res.status(200).json(resActy);
};
