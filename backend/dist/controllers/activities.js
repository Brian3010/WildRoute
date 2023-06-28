"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayActivity = exports.index = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const activities_1 = __importDefault(require("../models/activities"));
const index = async (req, res) => {
    console.log('/activitites GET REQUEST');
    const actList = await activities_1.default.find({});
    res.status(200).json(actList);
};
exports.index = index;
const displayActivity = async (req, res) => {
    console.log('/activities/:id GET REQUEST');
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        const error = { message: 'Invalid Id' };
        return res.status(404).json(error);
    }
    const activity = await activities_1.default.findById(id);
    if (!activity) {
        const error = { message: 'cannot find the activity' };
        return res.status(404).json(error);
    }
    return res.status(200).json(activity);
};
exports.displayActivity = displayActivity;
//# sourceMappingURL=activities.js.map