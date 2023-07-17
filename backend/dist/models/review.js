"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const schemaConfig = {
    strict: 'throw',
};
const reviewSchema = new Schema({
    body: {
        type: String,
    },
    rating: {
        type: Number,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, schemaConfig);
const Review = mongoose_1.default.model('Review', reviewSchema);
exports.default = Review;
//# sourceMappingURL=review.js.map