"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = user => {
    const token = jsonwebtoken_1.default.sign({
        userId: user._id,
        username: user.username,
    }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWTEXPIRE_ACCESS,
        subject: user._id && user._id.toString(),
    });
    return token;
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = user => {
    const token = jsonwebtoken_1.default.sign({
        userId: user._id,
        username: user.username,
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWTEXPIRE_REFRESH,
        subject: user._id && user._id.toString(),
    });
    return token;
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=tokenHandling.js.map