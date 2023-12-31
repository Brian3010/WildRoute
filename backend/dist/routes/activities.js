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
const multer_1 = __importDefault(require("multer"));
const actyController = __importStar(require("../controllers/activities"));
const middleware_1 = require("../middleware/middleware");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const router = express_1.default.Router();
router
    .route('/')
    .get((0, catchAsync_1.default)(actyController.index))
    .post(middleware_1.isLoggedIn, upload.array('imageFiles', 4), middleware_1.parsingMultiForm, middleware_1.validateActivity, (0, catchAsync_1.default)(middleware_1.uploadCloudinaryFile), (0, catchAsync_1.default)(actyController.createActivity));
router
    .route('/:id')
    .get((0, catchAsync_1.default)(actyController.displayActivity))
    .put(middleware_1.isLoggedIn, (0, catchAsync_1.default)(middleware_1.isAuthor), upload.array('imageFiles', 4), middleware_1.parsingMultiForm, middleware_1.validateActivity, (0, catchAsync_1.default)(middleware_1.uploadCloudinaryFile), (0, catchAsync_1.default)(actyController.updateActy))
    .delete(middleware_1.isLoggedIn, (0, catchAsync_1.default)(middleware_1.isAuthor), (0, catchAsync_1.default)(actyController.deleteActy));
exports.default = router;
//# sourceMappingURL=activities.js.map