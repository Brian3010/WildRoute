import mongoose from 'mongoose';
import { disconnectRedis } from '../utils/redis';

export const shutDownDbs = async () => {
  console.log('termination/interupt signal captured , shutting down redis');

  await disconnectRedis();

  console.log('disconnecting mongodb');
  mongoose.connection.close();

  // Gracefully exit the application
  process.exit(0);
};
