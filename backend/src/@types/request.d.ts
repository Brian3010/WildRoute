import mongoose, { PassportLocalDocument } from 'mongoose';
import User, { UserSchemaType } from '../models/user';

declare module 'express-serve-static-core' {
  interface Request {
    user?: Document<
      typeof User,
      {},
      {
        email: string;
      }
    > &
      Omit<
        {
          email: string;
        } & {
          _id: Types.ObjectId;
        },
        never
      >;
    imageFiles?: Array<{ url: string; fileName: string }>;
  }
}
