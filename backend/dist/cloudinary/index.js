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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCloudinaryMultiUpload = void 0;
require('dotenv').config;
const cloudinary = __importStar(require("cloudinary"));
const Cloudinary = cloudinary.v2;
Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function handleCloudinaryUpload(file) {
    const res = await Cloudinary.uploader.upload(file, {
        folder: 'WildRoute',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        resource_type: 'auto',
    });
    return res;
}
async function handleCloudinaryMultiUpload(fileList) {
    return new Promise((resolve, reject) => {
        const uploads = fileList.map(base64 => handleCloudinaryUpload(base64));
        Promise.all(uploads)
            .then(res => resolve(res))
            .catch(error => reject(error));
    });
}
exports.handleCloudinaryMultiUpload = handleCloudinaryMultiUpload;
//# sourceMappingURL=index.js.map