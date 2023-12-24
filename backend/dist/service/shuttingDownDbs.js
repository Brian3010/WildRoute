"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shutDownDbs = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const redis_1 = require("../utils/redis");
const shutDownDbs = async () => {
    console.log('termination/interupt signal captured , shutting down redis');
    await (0, redis_1.disconnectRedis)();
    console.log('disconnecting mongodb');
    mongoose_1.default.connection.close();
    process.exit(0);
};
exports.shutDownDbs = shutDownDbs;
//# sourceMappingURL=shuttingDownDbs.js.map