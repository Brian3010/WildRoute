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
    const numOfReviews = acty.reviews.push(reviewDoc.id);
    if (acty.reviews) {
        const copiedReviews = acty.reviews.slice(0, -1);
        let sum = 0;
        for (let i = 0; i < copiedReviews.length; i++) {
            console.log(copiedReviews[i].rating);
            sum += copiedReviews[i].rating;
        }
        const totalRating = sum + Number(review.rating);
        const averageRating = Math.round(totalRating / numOfReviews);
        acty.rating = averageRating;
    }
    await acty.save();
    await reviewDoc.save();
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