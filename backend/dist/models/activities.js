"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("../cloudinary");
const review_1 = __importDefault(require("./review"));
const { Schema } = mongoose_1.default;
const imageSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
    },
});
imageSchema.virtual('imgThumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_400');
});
const schemaConfig = {
    strict: 'throw',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
};
const ActivityListSchema = new Schema({
    activity_title: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    },
    location: {
        type: String,
        required: true,
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    description: {
        type: String,
        required: true,
    },
    avg_price: {
        type: Number,
        required: true,
    },
    tags: [
        {
            type: String,
            required: true,
        },
    ],
    image: {
        type: [imageSchema],
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
}, schemaConfig);
ActivityListSchema.post('findOneAndDelete', async function (actyToDel) {
    console.log('POST "findbyIdandDelete"');
    console.log('file: activities.ts:58 ~ actyToDel:', actyToDel);
    if (actyToDel) {
        await review_1.default.deleteMany({
            _id: {
                $in: actyToDel.reviews,
            },
        });
    }
    console.log(actyToDel.image);
    if (actyToDel.image) {
        const cldFileNames = actyToDel.image.map(i => i.fileName);
        await (0, cloudinary_1.removeCloudinaryImgs)(cldFileNames);
    }
});
ActivityListSchema.post('findOneAndUpdate', async function (acty) {
    if (acty) {
        const currentActy = await ActivityList.findById(acty._id).populate('reviews');
        if (currentActy) {
            const numOfReviews = currentActy.reviews?.length;
            const sumOfRating = currentActy.reviews?.reduce((acc, curr) => {
                return acc + curr.rating;
            }, 0);
            const updatedRating = Math.round(sumOfRating / numOfReviews);
            currentActy.rating = updatedRating || 0;
            currentActy.save();
        }
    }
});
const ActivityList = mongoose_1.default.model('ActivityList', ActivityListSchema);
exports.default = ActivityList;
//# sourceMappingURL=activities.js.map