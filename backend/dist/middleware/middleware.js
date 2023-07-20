"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidBody = exports.isLoggedIn = exports.authLoginInfo = exports.validateActivity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const joiSchema_1 = require("./joiSchema");
const validateActivity = (req, res, next) => {
    const acty = req.body;
    if (!acty)
        throw new AppError_1.default('Cannot fetch data from body', 404);
    const { error } = joiSchema_1.activitySchema.validate(acty, { abortEarly: false });
    if (error) {
        const message = error.details.map(el => el.message).join(',');
        throw new AppError_1.default(message, 400);
    }
    else {
        next();
    }
};
exports.validateActivity = validateActivity;
const authLoginInfo = (req, res, next) => {
    passport_1.default.authenticate('local', { session: false, passReqToCallback: true }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            throw new AppError_1.default('username and password not found (redirect to login)', 404);
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
    passport_1.default.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            throw new AppError_1.default(info.message || 'user not found', 404);
        }
        if (info) {
            throw new AppError_1.default(info.message, 401);
        }
        req.user = user;
        console.log('req.user: ', user);
        next();
    })(req, res, next);
};
exports.isLoggedIn = isLoggedIn;
const isValidBody = (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        throw new AppError_1.default('the body is empty', 404);
    if (Object.keys(req.body).includes('_id') ||
        Object.keys(req.body).includes('id') ||
        Object.keys(req.body).includes('userId')) {
        const id = req.body._id || req.body.id || req.body.userId || undefined;
        if (!mongoose_1.default.isValidObjectId(id))
            throw new AppError_1.default('id is not a valid mongoose id', 400);
        if (id === undefined)
            throw new AppError_1.default('undefined id', 400);
    }
    next();
};
exports.isValidBody = isValidBody;
//# sourceMappingURL=middleware.js.map