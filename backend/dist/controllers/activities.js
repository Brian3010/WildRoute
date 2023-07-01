"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivity = exports.displayActivity = exports.index = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const activities_1 = __importDefault(require("../models/activities"));
const AppError_1 = __importDefault(require("../utils/AppError"));
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
    if (!mongoose_1.default.isValidObjectId(id)) {
        throw new AppError_1.default('Invalid Activity Id', 400);
    }
    const activity = await activities_1.default.findById(id);
    if (!activity) {
        throw new AppError_1.default('Activity does not exist', 404);
    }
    return res.status(200).json(activity);
};
exports.displayActivity = displayActivity;
const createActivity = async (req, res, next) => {
    console.log('/activities POST REQUEST');
    const activity = req.body.activity;
    if (!activity)
        throw new AppError_1.default('Cannot fetch data submitted', 400);
    const newActivity = new activities_1.default(activity);
    await newActivity.save();
    res.status(200).json(activity);
};
exports.createActivity = createActivity;
//# sourceMappingURL=activities.js.map