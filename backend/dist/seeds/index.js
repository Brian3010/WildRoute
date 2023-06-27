"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activities_js_1 = __importDefault(require("../models/activities.js"));
const cities_js_1 = require("./cities.js");
const seedHelpers_js_1 = require("./seedHelpers.js");
main()
    .then(() => {
    console.log('CONNECTION SUCCESS');
})
    .catch(err => console.log(err));
async function main() {
    await mongoose_1.default.connect('mongodb://127.0.0.1:27017/wildRoute');
}
const randomIndex = (data) => {
    const randIndex = Math.floor(Math.random() * data.length);
    let subIndex = 0;
    if (Array.isArray(data[randIndex])) {
        subIndex = Math.floor(Math.random() * data[randIndex].length);
    }
    return [randIndex, subIndex];
};
const seedDb = async () => {
    console.log('seedDb() TRIGGED');
    const placeIdx = randomIndex(seedHelpers_js_1.places);
    const cityIdx = randomIndex(cities_js_1.cities)[0];
    await activities_js_1.default.deleteMany({});
    const ActList = new activities_js_1.default({
        activity_title: `${seedHelpers_js_1.places[placeIdx[0]][1]} ${seedHelpers_js_1.descriptors[placeIdx[0]]}`,
        location: `${cities_js_1.cities[cityIdx].city} ${cities_js_1.cities[cityIdx].admin_name}`,
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