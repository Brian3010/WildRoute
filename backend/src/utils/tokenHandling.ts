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
    process.env.JWT_SECRET as JWT.Secret,
    {
      expiresIn: process.env.JWTEXPIRE,
      subject: user._id && user._id.toString(),
    }
  );

  return token;
};
