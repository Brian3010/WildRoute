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
const registerUser = async (req, res, next) => {
    console.log(`${req.originalUrl} POST method`);
    const { email, username, password } = req.body.user;
    const user = new user_1.default({ email, username });
    await user_1.default.register(user, password);
    const token = (0, tokenHandling_1.generateAccessToken)(user);
    res.status(200).json({ accessToken: token });
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
    res.status(200).json({ accessToken, refreshToken, user: userTosend });
};
exports.loginUser = loginUser;
const logoutUser = async (req, res, next) => {
    const refreshToken = req.body.token;
    if (!refreshToken)
        throw new AppError_1.default('Cannot fetch data from body', 404);
    const result = await (0, redis_1.deleteRedisToken)(req.user._id, refreshToken);
    if (result === 0) {
        res.status(200).json({ message: 'Successfully logout' });
    }
    else {
        throw new AppError_1.default(result, 500);
    }
};
exports.logoutUser = logoutUser;
const refreshToken = (req, res) => {
    const { refreshToken, userId } = req.body;
    res.send('ok');
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=user.js.map