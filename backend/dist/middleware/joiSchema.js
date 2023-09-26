"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = exports.activitySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const customExtension = joi => {
    return {
        type: 'string',
        base: joi.string(),
        messages: {
            'string.escapeHTML': '{{#label}} must not include HTML',
        },
        rules: {
            escapeHTML: {
                validate(value, helpers) {
                    console.log(value);
                    const cleanHTMLVal = (0, sanitize_html_1.default)(value, {
                        allowedTags: [],
                        allowedAttributes: {},
                    });
                    if (cleanHTMLVal !== value)
                        return helpers.error('string.escapeHTML', { value });
                    return cleanHTMLVal;
                },
            },
        },
    };
};
const customJoi = joi_1.default.extend(customExtension);
exports.activitySchema = customJoi.object({
    activity: customJoi.object({
        activity_title: customJoi.string().min(5).required().escapeHTML(),
        location: customJoi.string().min(5).required().escapeHTML(),
        description: customJoi.string().min(5).max(300).required().escapeHTML(),
        avg_price: customJoi.number().max(10000).required(),
        tags: customJoi
            .array()
            .items(customJoi.string().valid('Adventure', 'Nature', 'Camping', 'Water Sport', 'Climbing').required()),
        DeletedImages: customJoi.array().items(customJoi
            .object({
            dbsId: customJoi.string().required(),
            cldId: customJoi.string().required(),
        })
            .required()),
    }),
});
exports.reviewSchema = joi_1.default.object({
    review: joi_1.default.object({
        body: joi_1.default.string().min(5).max(50).allow('').empty(''),
        rating: joi_1.default.number().max(5).min(1).required(),
    }).required(),
});
//# sourceMappingURL=joiSchema.js.map