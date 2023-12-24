import mongoose from 'mongoose';

// utils function
export const isValidMongooseId = (id: string) => mongoose.isValidObjectId(id);
