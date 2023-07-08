import mongoose, { InferSchemaType, PassportLocalDocument } from 'mongoose';
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

type UserSchemaType = InferSchemaType<typeof UserSchema>;

const User = mongoose.model<UserSchemaType>('User', UserSchema);

// TODO: configure passport in app.ts and use session for persistent login refer to noteExpress.md

export default User;
