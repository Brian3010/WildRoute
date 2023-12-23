"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shutDownRedisDbs = void 0;
const redis_1 = require("../utils/redis");
const shutDownRedisDbs = async () => {
    console.log('termination/interupt signal captured , shutting down redis');
    await (0, redis_1.disconnectRedis)();
    process.exit(0);
};
exports.shutDownRedisDbs = shutDownRedisDbs;
//# sourceMappingURL=shuttingDownDbs.js.map