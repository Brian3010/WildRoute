"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReviewAuthor = exports.isAuthor = exports.isLoggedIn = exports.authLoginInfo = exports.isValidBody = exports.validateReview = exports.validateActivity = exports.uploadCloudinaryFile = exports.parsingMultiForm = void 0;
const passport_1 = __importDefault(require("passport"));
const cloudinary_1 = require("../cloudinary");
const activities_1 = __importDefault(require("../models/activities"));
const review_1 = __importDefault(require("../models/review"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const joiSchema_1 = require("./joiSchema");
const parsingMultiForm = (req, res, next) => {
    try {
        const parsedActyBody = JSON.parse(req.body.jsonData);
        req.body = parsedActyBody;
    }
    catch (error) {
        throw new AppError_1.default('Cannot parse the body data, "actyData" must be in valid format', 422);
    }
    next();
};
exports.parsingMultiForm = parsingMultiForm;
const uploadCloudinaryFile = async (req, res, next) => {
    if (!req.file && !req.files) {
        return next();
    }
    const dataURIArr = Object.entries(req.files).map(f => {
        let b64 = Buffer.from(f[1].buffer).toString('base64');
        return `data:${f[1].mimetype};base64,${b64}`;
    });
    const cldRes = (await (0, cloudinary_1.handleCloudinaryMultiUpload)(dataURIArr));
    req.imageFiles = cldRes.map(cR => {
        return { fileName: cR.public_id, url: cR.secure_url };
    });
    next();
};
exports.uploadCloudinaryFile = uploadCloudinaryFile;
const validateActivity = (req, res, next) => {
    const acty = req.body;
    if (!acty)
        throw new AppError_1.default('Cannot fetch data from body', 404);
    const { error } = joiSchema_1.activitySchema.validate(acty, { abortEarly: false });
    if (error) {
        const message = error.details.map((el) => el.message).join(',');
        throw new AppError_1.default(message, 400);
    }
    else {
        next();
    }
};
exports.validateActivity = validateActivity;
const validateReview = (req, res, next) => {
    console.log(`${req.originalUrl} validateReview() middleware`);
    const reviewbody = req.body;
    if (!reviewbody)
        throw new AppError_1.default('missing reviews body', 400);
    const { error } = joiSchema_1.reviewSchema.validate(reviewbody, { abortEarly: false });
    if (error) {
        const message = error.details.map(el => el.message).join(',');
        throw new AppError_1.default(message, 400);
    }
    else {
        next();
    }
};
exports.validateReview = validateReview;
const isValidBody = (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        throw new AppError_1.default('the body is empty', 404);
    next();
};
exports.isValidBody = isValidBody;
const authLoginInfo = (req, res, next) => {
    passport_1.default.authenticate('local', { session: false, passReqToCallback: true }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            throw new AppError_1.default('Incorrect username and password', 404);
        }
        if (info) {
            throw new AppError_1.default(info.message, 401);
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.authLoginInfo = authLoginInfo;
const isLoggedIn = (req, res, next) => {
    console.log('isLoggedIn middleware');
    passport_1.default.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            throw new AppError_1.default(info.message || 'user not found', 403);
        }
        if (info) {
            throw new AppError_1.default(info.message, 401);
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.isLoggedIn = isLoggedIn;
const isAuthor = async (req, res, next) => {
    const userId = req.user._id.toString() || undefined;
    const actyId = req.params.id || undefined;
    if (!userId || !actyId)
        throw new AppError_1.default('undefined ids', 404);
    const acty = await activities_1.default.findById(actyId);
    if (!acty)
        throw new AppError_1.default('Activity not found', 404);
    if (acty.author.toString() !== userId)
        throw new AppError_1.default('You donot own this activity', 401);
    next();
};
exports.isAuthor = isAuthor;
const isReviewAuthor = async (req, res, next) => {
    console.log(`${req.originalUrl} isReviewAuthor Middleware`);
    const { reviewId } = req.params;
    const review = await review_1.default.findById(reviewId);
    if (!review)
        throw new AppError_1.default('Cannot find the review', 404);
    if (JSON.stringify(review.owner) !== JSON.stringify(req.user._id)) {
        throw new AppError_1.default('You do not have permission to delete this review', 401);
    }
    next();
};
exports.isReviewAuthor = isReviewAuthor;
//# sourceMappingURL=middleware.js.map