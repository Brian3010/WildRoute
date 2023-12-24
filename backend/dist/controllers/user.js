"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
require('dotenv').config();
const user_1 = __importDefault(require("../models/user"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const redis_1 = require("../utils/redis");
const tokenHandling_1 = require("../utils/tokenHandling");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (req, res, next) => {
    console.log(`${req.originalUrl} POST method`);
    const { email, username, password } = req.body.user;
    const user = new user_1.default({ email, username });
    await user_1.default.register(user, password);
    const token = (0, tokenHandling_1.generateAccessToken)(user);
    const refreshToken = (0, tokenHandling_1.generateRefreshToken)(user);
    await (0, redis_1.setRedisToken)(refreshToken, user._id.toString());
    res.status(200).json({ accessToken: token, refreshToken, message: 'redirect to other routes' });
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    console.log(`${req.originalUrl} POST method`);
    const user = req.user;
    const accessToken = (0, tokenHandling_1.generateAccessToken)(user);
    const refreshToken = (0, tokenHandling_1.generateRefreshToken)(user);
    console.log(user._id);
    await (0, redis_1.setRedisToken)(refreshToken, user._id);
    const { salt, hash, ...userTosend } = user._doc;
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.status(200).json({ accessToken, user: userTosend });
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    console.log(`${req.originalUrl} POST method`);
    const refreshToken = req.cookies.jwt || undefined;
    if (!refreshToken)
        throw new AppError_1.default('cookie not provided', 204);
    const result = await (0, redis_1.deleteRedisToken)(req.user._id, refreshToken);
    if (result === 0) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        res.status(200).json({ message: 'Successfully logout' });
    }
    else {
        throw new AppError_1.default(result, 500);
    }
};
exports.logoutUser = logoutUser;
const refreshToken = async (req, res, next) => {
    console.log(`${req.originalUrl} GET method`);
    const refreshToken = req.cookies.jwt || undefined;
    if (!refreshToken)
        throw new AppError_1.default('cookie not provided', 400);
    jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const token = await (0, redis_1.getRedisToken)(req.user._id);
    if (token === undefined)
        throw new AppError_1.default('undefined token', 404);
    if (token.length === 0)
        throw new AppError_1.default('There is no refreshToken in database (redirect to login)', 404);
    if (token !== refreshToken)
        throw new AppError_1.default('invalid refreshToken', 401);
    await (0, redis_1.deleteRedisToken)(req.user._id, refreshToken);
    const newAccessToken = (0, tokenHandling_1.generateAccessToken)(req.user);
    const newRefreshToken = (0, tokenHandling_1.generateRefreshToken)(req.user);
    await (0, redis_1.setRedisToken)(newRefreshToken, req.user._id);
    res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken: newAccessToken });
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=user.js.map