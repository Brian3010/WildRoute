import express, { Express, NextFunction, Request, Response, response } from 'express';
import session, { SessionOptions } from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/user';
import activitiesRoute from './routes/activities';
import userRoute from './routes/user';
import AppError from './utils/AppError';

const PORT = 3000;

// *Connect to dbs
main()
  .then(() => {
    console.log('CONNECTION SUCCESS');
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wildRoute');
}

const app: Express = express();

app.use(express.json());

// *configure session
const sessionConfig: SessionOptions = {
  secret: 'verycomplicatedsecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

// *Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});
passport.deserializeUser(User.deserializeUser());

// todo: configure the session and passport session create register route and login route

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
  console.log('Errors name: ', err.name);
  console.log(err);

  // console.log('error:', err);
  // res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
  res.status(err.statusCode || 500).json({ message: err.message } || { message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Now listening on PORT ${PORT}`);
});
