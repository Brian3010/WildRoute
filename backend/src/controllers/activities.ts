import { RequestHandler } from 'express';
import { ObjectId } from 'mongodb';
import { NewActivityBody } from '../@types/type-controller';
import { removeCloudinaryImgs } from '../cloudinary';
import ActivityList from '../models/activities';
import AppError from '../utils/AppError';
import { isValidMongooseId } from '../utils/isValidId';

// show a list of activities
export const index: RequestHandler = async (req, res, next) => {
  console.log('/activitites GET REQUEST');

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
    throw new AppError('Invalid Activity ID', 404);
  }

  const acty = await ActivityList.findById(id)
    .populate('author')
    .populate({ path: 'reviews', populate: { path: 'owner' } }); // poplute the reviews, then populate on each one of them their owners
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

  // add upload file (on Cloudinary) to the database
  if (req.imageFiles) newActy.image = req.imageFiles;

  // add user as author
  newActy.author = req.user._id;

  // add geometry using location
  //TODO: change type newActivityBody
  //TODO: Convert location string to geometry to store in the database

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
  const imgFiles = req.imageFiles;
  const actyBody = req.body.activity;

  if (!imgFiles) throw new AppError('request does not include the image files', 404);
  if (!isValidMongooseId(actyId)) throw new AppError('Invalid Activity Id', 400);
  if (!actyBody) throw new AppError('Cannot fetch data from body', 400);

  // console.log({ actyId, imgFiles, actyBody });\

  // https://stackoverflow.com/a/39333479 - Object Destructuring and Property Shorthand
  const updatedActy = (({ activity_title, avg_price, description, location, tags }) => ({
    activity_title,
    avg_price,
    description,
    location,
    tags,
  }))(actyBody);

  // deleled image in dbs if deletedImages exist, deleted in Mongodb and Cloudinary
  const imageResObj: { dbsMsg: string; cldMsg: string } = { dbsMsg: '', cldMsg: '' };
  if (actyBody.deletedImages) {
    // remove images from the dbs
    const dbsId = actyBody.deletedImages.map(i => i.dbsId);
    const dbsRes = await ActivityList.updateOne({ _id: actyId }, { $pull: { image: { _id: { $in: dbsId } } } });

    // remove images from cloudinary
    const cldIds = actyBody.deletedImages.map(i => i.cldId);
    // ignore if cldId is undefined or not exist
    const cldRes = await removeCloudinaryImgs(cldIds.filter(i => i !== undefined));
    // console.log({ cldRes });

    imageResObj['dbsMsg'] =
      dbsRes.modifiedCount !== 1
        ? 'Images not found in the database'
        : 'successfully deleted the image(s) in the database';
    if (Array.isArray(cldRes)) {
      imageResObj['cldMsg'] = `(${cldRes[0].result}) message from Cloudinary`;
    }
  }

  // update activity with id
  const resActy = await ActivityList.findByIdAndUpdate(actyId, { ...updatedActy }, { returnDocument: 'after' });
  if (!resActy) throw new AppError('Cannot fetch the activity', 400);

  //TODO: update geomotry here, using location string

  // convert the req.imageFiles to fulfil the image object in activity model
  // imgFiles array will be empty if no file detected
  if (imgFiles.length > 0) {
    const convertedImgFiles = imgFiles.map(f => ({ url: f.url, fileName: f.fileName }));
    resActy.image.push(...convertedImgFiles);
  }

  // save the update activity
  await resActy.save();

  // res.status(202).send({ dataReceived: req.body, cloudinaryRes:acty.image });
  res.status(201).json({ resActy, imageResObj });
};

// delete an activity
export const deleteActy: RequestHandler<actyparams, unknown, NewActivityBody, unknown> = async (req, res, next) => {
  const actyId = req.params.id;
  if (!isValidMongooseId(actyId)) throw new AppError('Invalid Activity Id', 400);

  const resActy = await ActivityList.findByIdAndDelete(actyId);

  res.status(200).json(resActy);
};
