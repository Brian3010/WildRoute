"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const axios_1 = __importStar(require("axios"));
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
    await mongoose_1.default.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/wildRoute');
}
const randomIndex = (data) => {
    const randIndex = Math.floor(Math.random() * data.length);
    let subIndex = 0;
    if (Array.isArray(data[randIndex])) {
        subIndex = Math.floor(Math.random() * data[randIndex].length);
    }
    return [randIndex, subIndex];
};
const getPhotoUrl = async (index) => {
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
        if ((0, axios_1.isAxiosError)(error) && error.response?.status === 403) {
            console.log('replacing with default image due to limit exceeded');
            return seedHelpers_js_1.images[index].photo_image_url.concat('?q=80&w=800&auto=format&fit=crop');
        }
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
    console.log({ numOfCities: cities_js_1.cities.length });
    for (let i = 0; i < 100; i++) {
        console.log(i);
        const placeIdx = randomIndex(seedHelpers_js_1.places);
        const cityIdx = randomIndex(cities_js_1.cities)[0];
        const imgUrl = await getPhotoUrl(i);
        const randTags = generateRandomTags();
        const ActList = new activities_js_1.default({
            activity_title: `${seedHelpers_js_1.places[placeIdx[0]][1]} ${seedHelpers_js_1.descriptors[placeIdx[0]] || 'Hiking'}`,
            location: `${cities_js_1.cities[i].city}, ${cities_js_1.cities[i].admin_name}`,
            geometry: {
                type: 'Point',
                coordinates: [cities_js_1.cities[i].lng, cities_js_1.cities[i].lat],
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
            author: '657e977538375d876877fb98',
        });
        await ActList.save();
    }
};
seedDb().then(() => {
    mongoose_1.default.connection.close();
});
//# sourceMappingURL=index.js.map