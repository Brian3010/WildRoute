import mongoose, { InferSchemaType } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameLowerCase: true,
  session: false, //Disable sessions as we'll use JWTs
});

export type UserSchemaType = InferSchemaType<typeof UserSchema>;

const User = mongoose.model<UserSchemaType>('User', UserSchema);

export default User;
