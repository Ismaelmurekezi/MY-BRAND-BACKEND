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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.update = exports.fetch = exports.create = void 0;
const cloudinary_1 = __importDefault(require("../cloudinary"));
const blogModel_1 = __importDefault(require("../model/blogModel"));
//Creating blog post
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        // Upload image to Cloudinary
        const result = yield (0, cloudinary_1.default)(req.file, res);
        // Return the URL of the uploaded image
        const { title, subject, subtitle, intro, caption, content } = req.body;
        const blogData = new blogModel_1.default({ subject, intro, caption, content, subtitle, title, image: result.secure_url });
        const blogExist = yield blogModel_1.default.findOne({ title });
        if (blogExist) {
            return res.status(400).json({ message: "Blog already exists" });
        }
        const savedBlog = yield blogData.save();
        res.status(201).json(savedBlog);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.create = create;
//Getting blog post
const fetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogModel_1.default.find();
        if (blogs.length === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetch = fetch;
// Update blog
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const blogExist = yield blogModel_1.default.findOne({ _id: id });
        if (!blogExist) {
            return res.status(404).json({ message: "Blog Not found" });
        }
        let updateData = req.body;
        if (req.file) {
            // Upload image to Cloudinary if a new file is provided
            const result = yield (0, cloudinary_1.default)(req.file, res);
            updateData.image = result.secure_url;
        }
        const updateBlog = yield blogModel_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        res.status(201).json(updateBlog);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.update = update;
//deleting blog
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const blogExist = yield blogModel_1.default.findById({ _id: id });
        if (!blogExist) {
            return res.status(404).json({ message: "Blog not found" });
        }
        yield blogModel_1.default.findByIdAndDelete(id);
        res.status(201).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteUser = deleteUser;
