"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const convertStringToURLParams = (value) => {
    return new url_1.URLSearchParams({ q: value }).toString().slice(2);
};
exports.default = convertStringToURLParams;
//# sourceMappingURL=convertStringToURLParams.js.map