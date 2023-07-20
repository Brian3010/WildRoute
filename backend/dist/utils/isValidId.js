"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidMongooseId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const isValidMongooseId = (id) => mongoose_1.default.isValidObjectId(id);
exports.isValidMongooseId = isValidMongooseId;
//# sourceMappingURL=isValidId.js.map