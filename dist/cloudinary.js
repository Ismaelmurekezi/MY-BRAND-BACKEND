"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_AP_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
const uploader = async (file, res) => {
    try {
        const profilePicture = await cloudinary_1.v2.uploader.upload(file.path, {
            folder: "image",
            use_filename: true,
        });
        return profilePicture;
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error,
        });
    }
};
exports.default = uploader;
