"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController = __importStar(require("../controllers/user"));
const middleware_1 = require("../middleware/middleware");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const router = express_1.default.Router();
router.route('/register').post(middleware_1.validateRegister, (0, catchAsync_1.default)(userController.registerUser));
router.route('/login').post(middleware_1.authLoginInfo, (0, catchAsync_1.default)(userController.loginUser));
router.route('/forgot-password').post((0, catchAsync_1.default)(userController.verifyEmail));
router.route('/reset-password').post((0, catchAsync_1.default)(userController.resetPassword));
router.route('/logout').get(middleware_1.isLoggedIn, (0, catchAsync_1.default)(userController.logoutUser));
router.route('/refresh-token').post(middleware_1.isValidBody, (req, _res, next) => {
    const { _id, username } = req.body;
    const user = { _id, username };
    req.user = user;
    return next();
}, (0, catchAsync_1.default)(userController.refreshToken));
exports.default = router;
//# sourceMappingURL=user.js.map