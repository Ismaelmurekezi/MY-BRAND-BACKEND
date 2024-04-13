"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary = require("cloudinary");
require("dotenv").config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_AP_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
const uploader = (file, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profilePicture = yield cloudinary.uploader.upload(file.path, {
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
});
exports.default = uploader;
