"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const schemaConfig = {
    strict: 'throw',
};
const ActivityListSchema = new Schema({
    activity_title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    avg_price: {
        type: Number,
        required: true,
    },
    image: {
        type: [
            {
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: true,
    },
}, schemaConfig);
const ActivityList = mongoose_1.default.model('ActivityList', ActivityListSchema);
exports.default = ActivityList;
//# sourceMappingURL=activities.js.map