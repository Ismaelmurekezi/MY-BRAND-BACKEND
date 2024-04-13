import express from "express";
import multer from "multer";
// import Blog from "../model/blogModel";
import {  create, deleteUser, fetch, update, addComment,likeBlog } from "../controller/blogController";
import { checkAuthorization } from "../middleware/verifyMiddleware";
import { authenticateUser } from "../middleware/authmiddleware";





// Import the Cloudinary configuration

const router = express.Router();


// Other blog routes
router.post("/create",checkAuthorization,create);
// router.get("/getAllBlogs", authenticateUser, fetch);
router.get("/getAllBlogs",checkAuthorization,fetch);
router.put("/update/:id",checkAuthorization,update);
router.delete("/delete/:id",checkAuthorization,deleteUser);

// Route for liking a blog post
router.post("/:blogId/like",authenticateUser,likeBlog);

// Route for adding a comment to a blog post
router.post("/:blogId/comment",authenticateUser,addComment);

export default router;
