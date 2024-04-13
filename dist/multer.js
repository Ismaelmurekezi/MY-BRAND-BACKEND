"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({});
const fileFilter = (req, file, cb) => {
    const extension = path_1.default.extname(file.originalname).toLowerCase();
    if (!(extension === '.jpg' || extension === '.jpeg' || extension === '.png')) {
        cb(new Error('Unsupported file!'));
        return;
    }
    cb(null, true);
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
});
exports.default = upload;
