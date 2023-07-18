import { Request } from 'express';
import JWT from 'jsonwebtoken';
import { PassportLocalDocument, PassportLocalModel, PassportLocalSchema } from 'mongoose';
import { UserSchemaType } from '../models/user';

// interface User {
//   _id: string;
//   username: string;
// }
// ! error cannot have cast the type
export const generateAccessToken: <T>(user: T) => string = user => {
  const token = JWT.sign(
    // payload
    {
      userId: user._id,
      userName: user.username,
    },
    // secret
    process.env.JWT_SECRET as JWT.Secret,
    {
      expiresIn: process.env.JWTEXPIRE,
      subject: user._id.toString(),
    }
  );

  return token;
};
