"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisToken = exports.setRedisToken = exports.uninitializeRedis = exports.connectToRedis = exports.initializeRedis = void 0;
const redis_1 = require("redis");
let redisClient;
const initializeRedis = async () => {
    redisClient = (0, redis_1.createClient)();
    redisClient.on('error', error => console.error(`Error : ${error}`));
    await redisClient.connect();
};
exports.initializeRedis = initializeRedis;
const connectToRedis = () => {
    return new Promise(async (resolve, reject) => {
        try {
            redisClient = (0, redis_1.createClient)();
            redisClient.on('error', error => reject(error));
            await redisClient.connect();
            return resolve();
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.connectToRedis = connectToRedis;
const uninitializeRedis = async () => {
    await redisClient.disconnect();
};
exports.uninitializeRedis = uninitializeRedis;
const setRedisToken = (key, currentToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newData = await redisClient.setEx(key, parseInt(process.env.REDIS_EXPIRE), currentToken);
            return resolve(newData);
        }
        catch (error) {
            return reject(error);
        }
    });
};
exports.setRedisToken = setRedisToken;
const getRedisToken = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newData = await redisClient.get(key);
            return resolve(newData);
        }
        catch (error) {
            return reject(error);
        }
    });
};
exports.getRedisToken = getRedisToken;
//# sourceMappingURL=redis.js.map