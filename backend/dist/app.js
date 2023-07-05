"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
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
passport_1.default.use(new passport_local_1.Strategy(user_1.default.authenticate()));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(user_1.default.deserializeUser());
app.use(passport_1.default.initialize());
app.use('/activities', activities_1.default);
app.use('/user', user_2.default);
app.all('*', (req, res, next) => {
    res.send('INVALID URL');
});
app.use((err, req, res, next) => {
    console.log('Errors name: ', err.name);
    res.status(err.statusCode || 500).json({ message: err.message } || { message: 'Internal Server Error' });
});
app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}`);
});
//# sourceMappingURL=app.js.map