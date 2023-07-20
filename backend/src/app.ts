require('dotenv').config();
import express, { Express, NextFunction, Request, Response, response } from 'express';
import session, { SessionOptions } from 'express-session';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import passport from 'passport';
import PassportJwt from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/user';
import activitiesRoute from './routes/activities';
import userRoute from './routes/user';
import AppError from './utils/AppError';
import { connectToRedis } from './utils/redis';

const PORT = 3000;

// *Connect to dbs
main()
  .then(() => {
    console.log('CONNECTION TO MONGODB SUCCESSFULLY');
    console.log('CONNECTION TO REDIS SUCCESSFULLY');
  })
  .catch(err => console.log('ERROR CONNECTING TO DBS -- ', err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wildRoute');
  await connectToRedis();
}

const app: Express = express();

app.use(express.json());

// *configure session
// const sessionConfig: SessionOptions = {
//   secret: 'verycomplicatedsecret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//   },
// };
// app.use(session(sessionConfig));

// *configure passport-jwt
// configure options for JWT
const jwtOpts: PassportJwt.StrategyOptions = {
  jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET,
};

passport.use(User.createStrategy());

// create verify callback
const jwtVerify: PassportJwt.VerifyCallback = async (payload: JwtPayload, done) => {
  // console.log('--------payload ', payload);

  User.findById(payload.sub)
    .then(user => {
      // If user was found with this id
      if (user) {
        done(null, user);
      } else {
        // If not user was found
        done(null, false);
      }
    })
    .catch(error => {
      // If there was failure
      done(error, false);
    });
};

//create strategy instance
const jwtStrategy: PassportJwt.Strategy = new PassportJwt.Strategy(jwtOpts, jwtVerify);

// use strategy
app.use(passport.initialize());
passport.use(jwtStrategy);

// *Passport configuration
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser(User.deserializeUser());

// *all the routes
// app.get('/', (req: Request, res: Response) => {
//   res.send('Helloooooasdaasdasdasdsasdasdd');
// });

app.use('/activities', activitiesRoute);

app.use('/user', userRoute);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.send('INVALID URL');
});

// *Errors are catched here from throwing new Error/AppError using next(error);
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log('Errors name: ', err.name || 'err.name not exist');
  console.log(err);

  // console.log('error:', err);
  // res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  res.status(err.statusCode || 500).json({ message: err.message } || { message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`NOW LISTENING ON PORT ${PORT}`);
});
