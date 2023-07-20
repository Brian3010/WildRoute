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

export const setRedisToken = (refreshToken: string, id: string) => {
  // would need to store refreshToken as array in redis dbs
  // const refreshTokenArr = [refreshToken];

  return new Promise(async (resolve, reject) => {
    try {
      // const newData = await redisClient.hSet(`userToken:${id}`, 'refreshTokens', JSON.stringify(refreshTokenArr));
      const newData = await redisClient.hSet(`userToken:${id}`, 'refreshTokens', refreshToken);
      return resolve(newData);
    } catch (error) {
      return reject(error);
    }
  });
};

export const getRedisToken: (id: string) => Promise<string> = id => {
  const key = `userToken:${id}`;
  const field = 'refreshTokens';
  return new Promise(async (resolve, reject) => {
    try {
      const newData = await redisClient.hGet(key, field);
      console.log(`newData`, newData);
      return resolve(newData as string);
    } catch (error) {
      return reject(error);
    }
  });
};

export const deleteRedisToken: (id: string, refreshToken: string) => Promise<string | number | void> = (
  id,
  refreshToken
) => {
  const key = `userToken:${id}`;
  const field = 'refreshTokens';

  return new Promise(async (resolve, reject) => {
    try {
      const token = await getRedisToken(id);
      console.log('getRedisToken:', token.length);
      if (token.length > 0 && token === refreshToken) {
        const tokenInDb = await redisClient.hSet(key, field, '');
        return resolve(tokenInDb);
      } else if (token.length === 0) {
        return resolve('RefreshToken in Redis is empty');
      } else {
        throw Error('Cannot delete refreshToken due to false comparison, Valid refreshToken must be provided');
      }
    } catch (err) {
      return reject(err);
    }
  });
};
