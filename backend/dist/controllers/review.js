"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.createReview = void 0;
const activities_1 = __importDefault(require("../models/activities"));
const review_1 = __importDefault(require("../models/review"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const createReview = async (req, res) => {
    console.log(`${req.originalUrl} POST request`);
    const actyId = req.params.id;
    const review = req.body.review;
    const acty = await activities_1.default.findById(actyId).populate('reviews');
    if (!acty)
        throw new AppError_1.default('activity not found', 404);
    const reviewDoc = new review_1.default(review);
    reviewDoc.owner = req.user._id;
    const reviewLength = acty.reviews.push(reviewDoc.id);
    if (acty.reviews) {
        let sum = 0;
        for (let i = 0; i < acty.reviews.length - 1; i++) {
            sum += acty.reviews[i].rating;
        }
        acty.rating = Math.round((sum + review.rating) / reviewLength);
    }
    await reviewDoc.save();
    await acty.save();
    res.status(200).json({ reviewCreated: reviewDoc });
};
exports.createReview = createReview;
const deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await activities_1.default.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const review = await review_1.default.findByIdAndDelete(reviewId);
    res.status(200).json({ reviewDeleted: review });
};
exports.deleteReview = deleteReview;
//# sourceMappingURL=review.js.map