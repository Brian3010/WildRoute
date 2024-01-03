import JWT from 'jsonwebtoken';
import { Document, Types } from 'mongoose';

interface UserObj {
  _id: Types.ObjectId;
  username: string;
}
type UserT = Document & Partial<UserObj>;

type GenerateFnType = <T extends UserT>(user: T) => string;

export const generateAccessToken: GenerateFnType = user => {
  const token = JWT.sign(
    // payload
    {
      userId: user._id,
      username: user.username,
    },
    // secret
    process.env.JWT_ACCESS_SECRET as JWT.Secret,
    {
      expiresIn: process.env.JWTEXPIRE_ACCESS,
      // expiresIn: '3s',
      subject: user._id && user._id.toString(),
    }
  );

  return token;
};

export const generateRefreshToken: GenerateFnType = user => {
  const token = JWT.sign(
    // payload
    {
      userId: user._id,
      username: user.username,
    },
    // secret
    process.env.JWT_REFRESH_SECRET as JWT.Secret,
    {
      // expiresIn: '6s',
      expiresIn: process.env.JWTEXPIRE_REFRESH,
      subject: user._id && user._id.toString(),
    }
  );

  return token;
};

export const generateResetPwdToken = (userId: Types.ObjectId) => {
  return JWT.sign(
    // payload
    {
      userId,
      // username: user.username,
    },
    // secret
    process.env.JWT_ACCESS_SECRET as JWT.Secret,
    {
      expiresIn: process.env.JWTEXPIRE_ACCESS,
      subject: userId && userId.toString(),
    }
  );
};
