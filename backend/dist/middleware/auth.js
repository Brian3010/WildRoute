"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_1 = __importDefault(require("../models/user"));
const JWT_TOKEN = 'this is jwt secret token';
const jwtOpts = {
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_TOKEN,
};
passport_1.default.use(user_1.default.createStrategy());
const jwtVerify = async (payload, done) => {
    user_1.default.findById(payload.sub)
        .then(user => {
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    })
        .catch(error => {
        done(error, false);
    });
};
const jwtStrategy = new passport_jwt_1.default.Strategy(jwtOpts, jwtVerify);
passport_1.default.use(jwtStrategy);
//# sourceMappingURL=auth.js.map