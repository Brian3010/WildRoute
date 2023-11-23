"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getMapboxGeometry = async (queryParam) => {
    const language = 'en';
    const country = 'au';
    const types = 'address%2Cpostcode';
    const limit = 1;
    const access_token = 'pk.eyJ1IjoiYnJpYW5uZzMwMTAiLCJhIjoiY2xwOGZyNGg0MGU1OTJsdGR1cnpmbWtrMiJ9.dCAa4VLNULL7c1ZIa5RJvg';
    const res = await axios_1.default.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${queryParam}?country=${country}&limit=${limit}&types=${types}&language=${language}&access_token=${access_token}`);
    return res.data.features[0].geometry;
};
exports.default = getMapboxGeometry;
//# sourceMappingURL=getMapBoxGeometry.js.map