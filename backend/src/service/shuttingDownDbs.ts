import { disconnectRedis } from '../utils/redis';

export const shutDownRedisDbs = async () => {
  console.log('termination/interupt signal captured , shutting down redis');

  await disconnectRedis();

  //// Gracefully exit the application
  process.exit(0);
};
