"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRedisToken = exports.getRedisToken = exports.setRedisToken = exports.disconnectRedis = exports.connectToRedis = void 0;
require('dotenv').config();
const redis_1 = require("redis");
let redisClient;
const connectToRedis = () => {
    return new Promise(async (resolve, reject) => {
        try {
            redisClient = (0, redis_1.createClient)({
                url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_SOCKET_HOST}:${process.env.REDIS_SOCKET_PORT}`,
            });
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
    console.log('disconnecting redis server');
    return redisClient.disconnect();
};
exports.disconnectRedis = disconnectRedis;
const setRedisToken = (refreshToken, id) => {
    const key = `userToken:${id}`;
    const field = 'refreshTokens';
    return new Promise(async (resolve, reject) => {
        try {
            const newData = await redisClient.hSet(key, field, refreshToken);
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
            const data = await redisClient.hGet(key, field);
            console.log('file: redis.ts:69 ~ returnnewPromise ~ dataa:', data);
            if (data === null)
                throw new Error('user id not exist in database (redirect to login - to create create a new one with legitimate id)');
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