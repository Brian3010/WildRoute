"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringToURLParams = void 0;
const url_1 = require("url");
const convertStringToURLParams = (value) => {
    return new url_1.URLSearchParams({ q: value }).toString().slice(2);
};
exports.convertStringToURLParams = convertStringToURLParams;
//# sourceMappingURL=helper.js.map