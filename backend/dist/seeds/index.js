"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activities_js_1 = __importDefault(require("../models/activities.js"));
const cities_js_1 = require("./cities.js");
main()
    .then(() => {
    console.log('CONNECTION SUCCESS');
})
    .catch(err => console.log(err));
async function main() {
    await mongoose_1.default.connect('mongodb://127.0.0.1:27017/wildRoute');
}
const seedDb = async () => {
    console.log(cities_js_1.cities.length);
    console.log('seedDb() TRIGGED');
    await activities_js_1.default.deleteMany({});
    const ActList = new activities_js_1.default({
        activity_title: 'title',
        location: 'lcoation',
        description: 'desc',
        price: 2,
        image: 'url',
    });
    await ActList.save()
        .then(res => {
        console.log('RESULT: ', res);
    })
        .catch(err => {
        console.log('Error:', err);
    });
};
seedDb().then(() => {
    mongoose_1.default.connection.close();
});
//# sourceMappingURL=index.js.map