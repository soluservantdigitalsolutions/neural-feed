const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "ddhdyuktu",
  api_key: "866744843578931",
  api_secret: "lgDyPJCWXQ8UDNd1cRNVdvqHUWo",
});

// cloudinary.js
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "neural-feed",
    resource_type: "image",
    public_id: (req, file) => "computed-filename-using-request",
  },
});

const parser = multer({ storage: storage });

module.exports = { cloudinary, parser };
