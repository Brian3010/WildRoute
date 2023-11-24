"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActy = exports.updateActy = exports.createActivity = exports.displayActivity = exports.index = void 0;
const cloudinary_1 = require("../cloudinary");
const activities_1 = __importDefault(require("../models/activities"));
const getMapboxGeometry_1 = __importDefault(require("../service/getMapboxGeometry"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const helper_1 = require("../utils/helper");
const isValidId_1 = require("../utils/isValidId");
const index = async (req, res, next) => {
    console.log('/activitites GET REQUEST');
    const actList = await activities_1.default.find();
    if (actList.length === 0)
        throw new AppError_1.default('Cannot fetch the activity list', 404);
    res.status(200).json(actList);
};
exports.index = index;
const displayActivity = async (req, res, next) => {
    console.log('/activities/:id GET REQUEST');
    const { id } = req.params;
    if (!(0, isValidId_1.isValidMongooseId)(id)) {
        throw new AppError_1.default('Invalid Activity ID', 404);
    }
    const acty = await activities_1.default.findById(id)
        .populate('author')
        .populate({ path: 'reviews', populate: { path: 'owner' } });
    if (!acty)
        throw new AppError_1.default('Activity does not exist', 404);
    if (!acty.populated)
        throw new AppError_1.default('Cannot populate the data', 400);
    return res.status(200).json(acty);
};
exports.displayActivity = displayActivity;
const createActivity = async (req, res, next) => {
    console.log('/activities POST REQUEST');
    const acty = req.body.activity;
    console.log({ acty });
    if (!acty)
        throw new AppError_1.default('Cannot fetch data from body', 400);
    const newActy = new activities_1.default(acty);
    if (req.imageFiles)
        newActy.image = req.imageFiles;
    newActy.author = req.user._id;
    const locationQuery = (0, helper_1.convertStringToURLParams)(acty.location) + '.json';
    const mbxGeometry = await (0, getMapboxGeometry_1.default)(locationQuery);
    newActy.geometry.type = mbxGeometry.type;
    newActy.geometry.coordinates = mbxGeometry.coordinates;
    const savedActy = await newActy.save();
    res.status(200).json(savedActy);
};
exports.createActivity = createActivity;
const updateActy = async (req, res, next) => {
    console.log('/activities/:id/edit PUT REQUEST');
    const actyId = req.params.id;
    const imgFiles = req.imageFiles;
    const actyBody = req.body.activity;
    if (!imgFiles)
        throw new AppError_1.default('request does not include the image files', 404);
    if (!(0, isValidId_1.isValidMongooseId)(actyId))
        throw new AppError_1.default('Invalid Activity Id', 400);
    if (!actyBody)
        throw new AppError_1.default('Cannot fetch data from body', 400);
    const updatedActy = (({ activity_title, avg_price, description, location, tags }) => ({
        activity_title,
        avg_price,
        description,
        location,
        tags,
    }))(actyBody);
    const imageResObj = { dbsMsg: '', cldMsg: '' };
    if (actyBody.deletedImages) {
        const dbsId = actyBody.deletedImages.map(i => i.dbsId);
        const dbsRes = await activities_1.default.updateOne({ _id: actyId }, { $pull: { image: { _id: { $in: dbsId } } } });
        const cldIds = actyBody.deletedImages.map(i => i.cldId);
        const cldRes = await (0, cloudinary_1.removeCloudinaryImgs)(cldIds.filter(i => i !== undefined));
        imageResObj['dbsMsg'] =
            dbsRes.modifiedCount !== 1
                ? 'Images not found in the database'
                : 'successfully deleted the image(s) in the database';
        if (Array.isArray(cldRes)) {
            imageResObj['cldMsg'] = `(${cldRes[0].result}) message from Cloudinary`;
        }
    }
    const resActy = await activities_1.default.findByIdAndUpdate(actyId, { ...updatedActy }, { returnDocument: 'after' });
    if (!resActy)
        throw new AppError_1.default('Cannot fetch the activity', 400);
    if (imgFiles.length > 0) {
        const convertedImgFiles = imgFiles.map(f => ({ url: f.url, fileName: f.fileName }));
        resActy.image.push(...convertedImgFiles);
    }
    const locationQuery = (0, helper_1.convertStringToURLParams)(resActy.location) + '.json';
    const mbxGeometry = await (0, getMapboxGeometry_1.default)(locationQuery);
    resActy.geometry.type = mbxGeometry.type;
    resActy.geometry.coordinates = mbxGeometry.coordinates;
    await resActy.save();
    res.status(201).json({ resActy, imageResObj });
};
exports.updateActy = updateActy;
const deleteActy = async (req, res, next) => {
    const actyId = req.params.id;
    if (!(0, isValidId_1.isValidMongooseId)(actyId))
        throw new AppError_1.default('Invalid Activity Id', 400);
    const resActy = await activities_1.default.findByIdAndDelete(actyId);
    res.status(200).json(resActy);
};
exports.deleteActy = deleteActy;
//# sourceMappingURL=activities.js.map