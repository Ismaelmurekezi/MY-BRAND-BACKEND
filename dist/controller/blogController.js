"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeBlog = exports.addComment = exports.deleteUser = exports.update = exports.getBlogById = exports.fetch = exports.create = void 0;
const blogModel_1 = __importDefault(require("../model/blogModel"));
const cloudinary_1 = __importDefault(require("../cloudinary"));
const userModel_1 = __importDefault(require("../model/userModel"));
//Creating blog post
const create = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        // Upload image to Cloudinary
        const result = await (0, cloudinary_1.default)(req.file, res);
        // Return the URL of the uploaded image
        const { title, subject, subtitle, intro, caption, content } = req.body;
        const blogData = new blogModel_1.default({ subject, intro, caption, content, subtitle, title, image: result.secure_url });
        const blogExist = await blogModel_1.default.findOne({ title });
        if (blogExist) {
            return res.status(400).json({ message: "Blog already exists" });
        }
        const savedBlog = await blogData.save();
        res.status(201).json(savedBlog);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.create = create;
//Getting blog post
const fetch = async (req, res) => {
    try {
        const blogs = await blogModel_1.default.find().populate("comments.user");
        ;
        if (blogs.length === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.fetch = fetch;
// Controller function to fetch a single blog post by ID
const getBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        // Query the database to find the blog post by ID
        const blog = await blogModel_1.default.findById(blogId).populate("comments.user");
        // Check if the blog post exists
        if (!blog) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        // If the blog post exists
        res.status(200).json(blog);
    }
    catch (error) {
        // Handle errors
        console.error("Error fetching blog post by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getBlogById = getBlogById;
// Update blog
const update = async (req, res) => {
    try {
        const id = req.params.id;
        const blogExist = await blogModel_1.default.findOne({ _id: id });
        if (!blogExist) {
            return res.status(404).json({ message: "Blog Not found" });
        }
        let updateData = req.body;
        if (req.file) {
            // Upload image to Cloudinary if a new file is provided
            const result = await (0, cloudinary_1.default)(req.file, res);
            updateData.image = result.secure_url;
        }
        const updateBlog = await blogModel_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        res.status(201).json(updateBlog);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.update = update;
//deleting blog
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const blogExist = await blogModel_1.default.findById({ _id: id });
        if (!blogExist) {
            return res.status(404).json({ message: "Blog not found" });
        }
        await blogModel_1.default.findByIdAndDelete(id);
        res.status(201).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteUser = deleteUser;
//Adding comment to blog post
const addComment = async (req, res) => {
    try {
        const { text, username, userEmail } = req.body;
        const userId = req.user._id;
        const blogId = req.params.blogId;
        // Find the blog post by ID
        const blog = await blogModel_1.default.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        // Fetch the user's email using their userId
        const user = await userModel_1.default.findById(userId);
        // const userEmail = user?.email;
        console.log(user);
        // Create a new comment object
        const newComment = {
            user: userId,
            userEmail,
            username,
            text,
        };
        // Add the comment to the blog post
        blog.comments.push(newComment);
        // Save the updated blog post
        const updatedBlog = await blog.save();
        res.status(200).json({ message: "Comment added successfully", blog: updatedBlog });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.addComment = addComment;
const likeBlog = async (req, res) => {
    try {
        //user data is in req.user
        const userId = req.user._id;
        const blogId = req.params.blogId;
        // Find the blog post by ID
        const blog = await blogModel_1.default.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        // Check if user already liked the post
        const alreadyLiked = blog.likedBy.includes(userId);
        if (alreadyLiked) {
            // Removing like 
            blog.likedBy = blog.likedBy.filter(id => id.toString() !== userId.toString());
            blog.likes > 0 ? blog.likes-- : blog.likes = 0;
        }
        else {
            // Add user ID to likedBy array
            blog.likedBy.push(userId);
            blog.likes++;
        }
        // Save the updated blog post
        const updatedBlog = await blog.save();
        res.status(200).json({ message: alreadyLiked ? "Unliked" : "Liked", blog: updatedBlog });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.likeBlog = likeBlog;
