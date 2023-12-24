require('dotenv').config();
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import passport from 'passport';
import PassportJwt from 'passport-jwt';
import { resolve } from 'path';
import { callbackify } from 'util';
import User from './models/user';
import activitiesRoute from './routes/activities';
import reviewRoute from './routes/review';
import userRoute from './routes/user';
import { shutDownDbs } from './service/shuttingDownDbs';
import AppError from './utils/AppError';
import { connectToRedis, disconnectRedis } from './utils/redis';
// import multer from 'multer';

const PORT = 3000;

// *Connect to dbs
main()
  .then(() => {
    console.log('CONNECTION TO MONGODB SUCCESSFULLY');
    console.log('CONNECTION TO REDIS SUCCESSFULLY');
  })
  .catch(err => console.log('ERROR CONNECTING TO DBS -- ', err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/wildRoute');
  await connectToRedis();
}

const app: Express = express();

// shutting down dbs service when receiving interuption signal
process.on('SIGINT', shutDownDbs);
process.on('SIGTERM', shutDownDbs);

// configure Multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// app.use(upload.any);

// use this so dont need to set Content-Type': 'application/json' on client
app.use(express.json());
// Use the cookie-parser middleware
app.use(cookieParser());

// *sanitize route to prevent mongo injection
app.use(
  mongoSanitize({
    replaceWith: '_',
  })
);
// TODO: use cors or helmet to allow frontend to hit backend API
const whiteList = ['http://localhost:5173']; // TODO: would need to add more due to security issues

app.use(
  cors({
    // origin: '*',
    // origin: 'http://localhost:5173',
    origin: (origin, callbackify) => {
      if (typeof origin === 'string' && whiteList.indexOf(origin) !== -1) {
        callbackify(null, true);
      } else {
        callbackify(new Error());
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

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
app.get('/', (req, res) => {
  console.log(req.query);
  res.json({ message: 'Home Page' });
});

// *activities routes
app.use('/activities', activitiesRoute);

// *user routes
app.use('/user', userRoute);

// *review routes
app.use('/activities/:id/review', reviewRoute);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError('Page Not Found', 404));
});

// *Errors are catched here from throwing new Error/AppError using next(error);
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log('Errors name: ', err.name || 'err.name not exist');
  console.log(err);

  // console.log('error:', err);
  // res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  res.status(err.statusCode || 500).json({ error: err.message } || { message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`NOW LISTENING ON PORT ${PORT}`);
});
