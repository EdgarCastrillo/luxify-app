'use strict';

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dkrusdq9r',
  api_key: '986893168329985',
  api_secret: 'oxL4iK3CruUJlGMtUnOd6VP4pz0'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'luxify',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({ storage: storage });

module.exports = parser;
