"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRedisToken = exports.getRedisToken = exports.setRedisToken = exports.uninitializeRedis = exports.connectToRedis = exports.initializeRedis = void 0;
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
const setRedisToken = (refreshToken, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newData = await redisClient.hSet(`userToken:${id}`, 'refreshTokens', refreshToken);
            return resolve(newData);
        }
        catch (error) {
            return reject(error);
        }
    });
};
exports.setRedisToken = setRedisToken;
const getRedisToken = id => {
    const key = `userToken:${id}`;
    const field = 'refreshTokens';
    return new Promise(async (resolve, reject) => {
        try {
            const newData = await redisClient.hGet(key, field);
            console.log(`newData`, newData);
            return resolve(newData);
        }
        catch (error) {
            return reject(error);
        }
    });
};
exports.getRedisToken = getRedisToken;
const deleteRedisToken = (id, refreshToken) => {
    const key = `userToken:${id}`;
    const field = 'refreshTokens';
    return new Promise(async (resolve, reject) => {
        try {
            const token = await (0, exports.getRedisToken)(id);
            console.log('getRedisToken:', token.length);
            if (token.length > 0 && token === refreshToken) {
                const tokenInDb = await redisClient.hSet(key, field, '');
                return resolve(tokenInDb);
            }
            else if (token.length === 0) {
                return resolve('RefreshToken in Redis is empty');
            }
            else {
                throw Error('Cannot delete refreshToken due to false comparison, Valid refreshToken must be provided');
            }
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.deleteRedisToken = deleteRedisToken;
//# sourceMappingURL=redis.js.map