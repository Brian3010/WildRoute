require('dotenv').config;
import * as cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
const Cloudinary = cloudinary.v2; // same as const Cloudinary = require('cloudinary').v2;

// setup Cloudinary SDK and define a function to upload files

Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// handle a single upload file
async function handleCloudinaryUpload(file: string) {
  const res = await Cloudinary.uploader.upload(file, {
    folder: 'WildRoute',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    resource_type: 'auto',
    // overwrite:true
  });

  return res;
}

// handle multiple upload files
export async function handleCloudinaryMultiUpload(fileList: string[]) {
  return new Promise((resolve, reject) => {
    const uploads = fileList.map(base64 => handleCloudinaryUpload(base64));
    // uploads[object{pending},object{pending},object{pending}...]

    Promise.all(uploads)
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
}

export function removeCloudinaryImgs(cldPublicId: string[]) {
  return new Promise((resolve, reject) => {
    const destroys = cldPublicId.map(id => {
      return Cloudinary.uploader.destroy(id);
    });

    Promise.all(destroys)
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
}
