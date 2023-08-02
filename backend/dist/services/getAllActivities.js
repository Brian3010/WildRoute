"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllActivities = void 0;
const axios_1 = __importDefault(require("axios"));
async function getAllActivities() {
    const res = await axios_1.default.get('/activities');
    return res.data;
}
exports.getAllActivities = getAllActivities;
//# sourceMappingURL=getAllActivities.js.map