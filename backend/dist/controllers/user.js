"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.registerUser = void 0;
require('dotenv').config();
const user_1 = __importDefault(require("../models/user"));
const registerUser = async (req, res, next) => {
    console.log(`${req.originalUrl} POST method`);
    const { email, username, password } = req.body.user;
    const user = new user_1.default({ email, username });
    await user_1.default.register(user, password);
    req.user = user;
    next();
};
exports.registerUser = registerUser;
const logoutUser = (req, res, next) => {
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=user.js.map