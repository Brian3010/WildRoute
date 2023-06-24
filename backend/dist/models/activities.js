"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ActivityListSchema = new Schema({
    // id: String,
    activity_title: String,
    location: String,
    description: String,
    price: Number,
    image: String,
});
//{id, activity_name, location, desciption(fact), price, image, author}.
const ActivityList = mongoose_1.default.model('ActivityList', ActivityListSchema);
module.exports = ActivityList;
//# sourceMappingURL=activities.js.map