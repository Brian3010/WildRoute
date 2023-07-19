"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenInBlackList = exports.isLoggedIn = exports.authCheck = exports.validateActivity = void 0;
const passport_1 = __importDefault(require("passport"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const redis_1 = require("../utils/redis");
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
const authCheck = (req, res, next) => {
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
exports.authCheck = authCheck;
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
        next();
    })(req, res, next);
};
exports.isLoggedIn = isLoggedIn;
const isTokenInBlackList = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader || exports.authCheck.length === 0) {
        const token = req.headers.authorization.startsWith('bearer ') && req.headers.authorization.split(' ')[1];
        const result = await (0, redis_1.getRedisToken)('tokens');
        if (result === JSON.stringify(token)) {
            throw new AppError_1.default('token exist in blacklist', 403);
        }
        next();
    }
    else {
        throw new AppError_1.default('Authorization not exist', 404);
    }
};
exports.isTokenInBlackList = isTokenInBlackList;
//# sourceMappingURL=middleware.js.map