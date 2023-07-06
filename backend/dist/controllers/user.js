"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const registerUser = async (req, res, next) => {
    console.log(`${req.originalUrl} POST method`);
    const { email, username, password } = req.body.user;
    const user = new user_1.default({ email, username });
    await user_1.default.register(user, password);
    res.status(200).json({ username, id: user._id });
};
exports.registerUser = registerUser;
const loginUser = (req, res, next) => {
    console.log(`${req.originalUrl} POST method`);
    res.status(200).json(req.user);
};
exports.loginUser = loginUser;
//# sourceMappingURL=user.js.map