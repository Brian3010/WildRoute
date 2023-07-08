import { RequestHandler } from 'express';
import passport from 'passport';
import PassportJwt from 'passport-jwt';
import User from '../models/user';

// should go to .env file -> add this later
const JWT_TOKEN = 'this is jwt secret token';

const jwtOpts: PassportJwt.StrategyOptions = {
  jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_TOKEN,
};

passport.use(User.createStrategy());

// create verify callback
const jwtVerify: PassportJwt.VerifyCallback = async (payload, done) => {
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

//create strategy
const jwtStrategy: PassportJwt.Strategy = new PassportJwt.Strategy(jwtOpts, jwtVerify);

// use strategy
passport.use(jwtStrategy);
