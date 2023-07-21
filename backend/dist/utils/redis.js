"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRedisToken = exports.getRedisToken = exports.setRedisToken = exports.disconnectRedis = exports.connectToRedis = exports.initializeRedis = void 0;
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
const disconnectRedis = async () => {
    await redisClient.disconnect();
};
exports.disconnectRedis = disconnectRedis;
const setRedisToken = (refreshToken, id) => {
    const key = `userToken:${id}`;
    const field = 'refreshTokens';
    return new Promise(async (resolve, reject) => {
        try {
            const data = await redisClient.hSet(key, field, refreshToken);
            return resolve(data);
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
            const data = await redisClient.hGet(key, field);
            return resolve(data);
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
            if (token) {
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
            else {
                throw new Error('Token is undefined');
            }
        }
        catch (err) {
            return reject(err);
        }
    });
};
exports.deleteRedisToken = deleteRedisToken;
//# sourceMappingURL=redis.js.map