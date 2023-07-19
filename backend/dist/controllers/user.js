"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
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
const loginUser = (req, res, next) => {
    console.log(`${req.originalUrl} POST method`);
    const user = req.user;
    const token = (0, tokenHandling_1.generateAccessToken)(user);
    res.status(200).json({ accessToken: token });
};
exports.loginUser = loginUser;
const logoutUser = async (req, res, next) => {
    const user = req.user;
    console.log(user);
    const token = req.headers.authorization.startsWith('bearer ') ? req.headers.authorization.split(' ')[1] : undefined;
    if (!token)
        throw new AppError_1.default('Cannot valididate the token', 404);
    const result = await (0, redis_1.setRedisToken)('tokens', JSON.stringify(token));
    res.status(200).json({ redisResult: result, message: 'Successfully added to the blacklist', tokenAdded: token });
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=user.js.map