"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ActivityListSchema = new Schema({
    activity_title: String,
    location: String,
    description: String,
    avg_price: Number,
    image: String,
});
const ActivityList = mongoose_1.default.model('ActivityList', ActivityListSchema);
exports.default = ActivityList;
//# sourceMappingURL=activities.js.map