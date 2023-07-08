"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_1 = __importDefault(require("./models/user"));
const activities_1 = __importDefault(require("./routes/activities"));
const user_2 = __importDefault(require("./routes/user"));
const PORT = 3000;
main()
    .then(() => {
    console.log('CONNECTION SUCCESS');
})
    .catch(err => console.log(err));
async function main() {
    await mongoose_1.default.connect('mongodb://127.0.0.1:27017/wildRoute');
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
const jwtOpts = {
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
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
app.use('/activities', activities_1.default);
app.use('/user', user_2.default);
app.all('*', (req, res, next) => {
    res.send('INVALID URL');
});
app.use((err, req, res, next) => {
    console.log('Errors name: ', err.name);
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message } || { message: 'Internal Server Error' });
});
app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}`);
});
//# sourceMappingURL=app.js.map