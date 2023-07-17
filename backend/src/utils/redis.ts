import type { RedisClientType } from 'redis';
import { createClient } from 'redis';

let redisClient: RedisClientType;
export const initializeRedis = async () => {
  redisClient = createClient();

  redisClient.on('error', error => console.error(`Error : ${error}`));

  await redisClient.connect();
};

export const connectToRedis = (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      redisClient = createClient(); // will need to specify an url for production ({url:...})
      redisClient.on('error', error => reject(error));

      await redisClient.connect();
      return resolve();
    } catch (err) {
      return reject(err);
    }
  });
};

export const uninitializeRedis = async () => {
  await redisClient.disconnect();
};

// export const getOrSetCache = (key: string, currentToken: string) => {
//   return new Promise(async (resolve, reject) => {
//     console.log(await redisClient.get(key));
//     try {
//       const result = await redisClient.get(key);
//       if (result != null) return resolve(result);

//       const newData = await redisClient.setEx(key, parseInt(process.env.REDIS_EXPIRE!), currentToken);
//       return resolve(newData);
//     } catch (error) {
//       return reject(error);
//     }
//   });
// };

export const setRedisToken = (key: string, currentToken: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newData = await redisClient.setEx(key, parseInt(process.env.REDIS_EXPIRE!), currentToken);
      return resolve(newData);
    } catch (error) {
      return reject(error);
    }
  });
};

export const getRedisToken = (key: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newData = await redisClient.get(key);
      return resolve(newData);
    } catch (error) {
      return reject(error);
    }
  });
};
