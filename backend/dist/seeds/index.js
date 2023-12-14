"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const axios_1 = __importDefault(require("axios"));
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
const getPhotoUrl = async () => {
    try {
        const response = await axios_1.default.get('https://api.unsplash.com/photos/random', {
            params: {
                collections: '3293100',
                client_id: process.env.UNSPLASH_KEY,
            },
        });
        return response.data.urls.small;
    }
    catch (error) {
        console.log('ERROR: ', error);
    }
    return undefined;
};
const generateRandomTags = () => {
    const tags = ['Adventure', 'Nature', 'Camping', 'Water Sport', 'Climbing'];
    const someTags = [];
    while (someTags.length < 3) {
        const randIndex = Math.floor(Math.random() * tags.length);
        if (!someTags.includes(tags[randIndex])) {
            someTags.push(tags[randIndex]);
        }
    }
    return someTags;
};
const seedDb = async () => {
    console.log('seedDb() TRIGGED');
    await activities_js_1.default.deleteMany({});
    const nonDupIndexArray = new Array();
    for (let i = 0; i < 50; i++) {
        console.log(i);
        const placeIdx = randomIndex(seedHelpers_js_1.places);
        const cityIdx = randomIndex(cities_js_1.cities)[0];
        if (!nonDupIndexArray.includes(cityIdx)) {
            nonDupIndexArray.push(cityIdx);
        }
        else {
            i = i - 1;
            continue;
        }
        const imgUrl = await getPhotoUrl();
        const randTags = generateRandomTags();
        const ActList = new activities_js_1.default({
            activity_title: `${seedHelpers_js_1.places[placeIdx[0]][1]} ${seedHelpers_js_1.descriptors[placeIdx[0]]}`,
            location: `${cities_js_1.cities[cityIdx].city}, ${cities_js_1.cities[cityIdx].admin_name}`,
            geometry: {
                type: 'Point',
                coordinates: [cities_js_1.cities[cityIdx].lng, cities_js_1.cities[cityIdx].lat],
            },
            description: 'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem eligendi eaquesaepe aliquid iusto molestias ut cupiditate quisquam, laboriosam, quo quia culpa obcaecati, modi unde.',
            avg_price: 2,
            tags: randTags,
            image: [
                {
                    url: imgUrl,
                    fileName: `fileName${i}`,
                },
                {
                    url: imgUrl,
                    fileName: `fileName${i}`,
                },
            ],
            author: '64c0bfe1503dd1eda3269198',
        });
        await ActList.save();
    }
};
seedDb().then(() => {
    mongoose_1.default.connection.close();
});
//# sourceMappingURL=index.js.map