"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_1 = __importDefault(require("./models/user"));
const activities_1 = __importDefault(require("./routes/activities"));
const review_1 = __importDefault(require("./routes/review"));
const user_2 = __importDefault(require("./routes/user"));
const shuttingDownDbs_1 = require("./service/shuttingDownDbs");
const AppError_1 = __importDefault(require("./utils/AppError"));
const redis_1 = require("./utils/redis");
const PORT = 3000;
main()
    .then(() => {
    console.log('CONNECTION TO MONGODB SUCCESSFULLY');
    console.log('CONNECTION TO REDIS SUCCESSFULLY');
})
    .catch(err => console.log('ERROR CONNECTING TO DBS -- ', err));
async function main() {
    await mongoose_1.default.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/wildRoute');
    await (0, redis_1.connectToRedis)();
}
const app = (0, express_1.default)();
process.on('SIGINT', shuttingDownDbs_1.shutDownDbs);
process.on('SIGTERM', shuttingDownDbs_1.shutDownDbs);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_mongo_sanitize_1.default)({
    replaceWith: '_',
}));
const whiteList = ['http://localhost:5173'];
app.use((0, cors_1.default)({
    origin: (origin, callbackify) => {
        if (typeof origin === 'string' && whiteList.indexOf(origin) !== -1) {
            callbackify(null, true);
        }
        else {
            callbackify(new Error());
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}));
const jwtOpts = {
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_SECRET,
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
app.use(passport_1.default.initialize());
passport_1.default.use(jwtStrategy);
app.get('/', (req, res) => {
    console.log(req.query);
    res.json({ message: 'Home Page' });
});
app.use('/activities', activities_1.default);
app.use('/user', user_2.default);
app.use('/activities/:id/review', review_1.default);
app.all('*', (req, res, next) => {
    next(new AppError_1.default('Page Not Found', 404));
});
app.use((err, req, res, next) => {
    console.log('Errors name: ', err.name || 'err.name not exist');
    console.log(err);
    res.status(err.statusCode || 500).json({ error: err.message } || { message: 'Internal Server Error' });
});
app.listen(PORT, () => {
    console.log(`NOW LISTENING ON PORT ${PORT}`);
});
//# sourceMappingURL=app.js.map