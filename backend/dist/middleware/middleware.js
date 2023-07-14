"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.signUserJWT = exports.authCheck = exports.validateActivity = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const signUserJWT = (req, res, next) => {
    const user = req.user;
    console.log(user);
    const token = jsonwebtoken_1.default.sign({
        username: user.username,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWTEXPIRE,
        subject: user._id.toString(),
    });
    res.json({ token });
};
exports.signUserJWT = signUserJWT;
const isLoggedIn = (req, res, next) => {
};
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=middleware.js.map