"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateActivity = void 0;
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
//# sourceMappingURL=middleware.js.map