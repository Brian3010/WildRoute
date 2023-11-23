"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const axios_1 = __importDefault(require("axios"));
const getMapboxGeometry = async (queryParam) => {
    const language = 'en';
    const country = 'au';
    const types = 'address%2Cpostcode';
    const limit = 1;
    const res = await axios_1.default.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${queryParam}?country=${country}&limit=${limit}&types=${types}&language=${language}&access_token=${process.env.MAPBOXGEOTOKEN}`);
    return res.data.features[0].geometry;
};
exports.default = getMapboxGeometry;
//# sourceMappingURL=getMapboxGeometry.js.map