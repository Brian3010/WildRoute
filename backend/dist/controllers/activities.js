"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActy = exports.updateActy = exports.createActivity = exports.displayActivity = exports.index = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const activities_1 = __importDefault(require("../models/activities"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const isValidId = (id) => mongoose_1.default.isValidObjectId(id);
const index = async (req, res, next) => {
    console.log('/activitites GET REQUEST');
    const actList = await activities_1.default.find({});
    if (actList.length === 0)
        throw new AppError_1.default('Cannot fetch the activity list', 404);
    res.status(200).json(actList);
};
exports.index = index;
const displayActivity = async (req, res, next) => {
    console.log('/activities/:id GET REQUEST');
    const { id } = req.params;
    if (!isValidId(id)) {
        throw new AppError_1.default('Invalid Activity Id', 400);
    }
    const acty = await activities_1.default.findById(id);
    if (!acty) {
        throw new AppError_1.default('Activity does not exist', 404);
    }
    return res.status(200).json(acty);
};
exports.displayActivity = displayActivity;
const createActivity = async (req, res, next) => {
    console.log('/activities POST REQUEST');
    const acty = req.body.activity;
    if (!acty)
        throw new AppError_1.default('Cannot fetch data from body', 400);
    const newActy = new activities_1.default(acty);
    const savedActy = await newActy.save();
    res.status(200).json(savedActy);
};
exports.createActivity = createActivity;
const updateActy = async (req, res, next) => {
    console.log('/activities/:id/edit PUT REQUEST');
    const actyId = req.params.id;
    if (!isValidId(actyId))
        throw new AppError_1.default('Invalid Activity Id', 400);
    const acty = req.body.activity;
    if (!acty)
        throw new AppError_1.default('Cannot fetch data from body', 400);
    const resActy = await activities_1.default.findByIdAndUpdate(actyId, { ...acty });
    res.status(201).json(resActy);
};
exports.updateActy = updateActy;
const deleteActy = async (req, res, next) => {
    const actyId = req.params.id;
    if (!isValidId(actyId))
        throw new AppError_1.default('Invalid Activity Id', 400);
    const resActy = await activities_1.default.findByIdAndDelete(actyId);
    res.status(200).json(resActy);
};
exports.deleteActy = deleteActy;
//# sourceMappingURL=activities.js.map