"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.activitySchema = joi_1.default.object({
    activity: joi_1.default.object({
        activity_title: joi_1.default.string().min(5).required(),
        location: joi_1.default.string().min(5).required(),
        description: joi_1.default.string().min(5).max(50).required(),
        avg_price: joi_1.default.number().max(10000).required(),
        image: joi_1.default.array().items(joi_1.default.object({
            url: joi_1.default.string().required(),
        }).required()),
    }).required(),
});
//# sourceMappingURL=joiSchema.js.map