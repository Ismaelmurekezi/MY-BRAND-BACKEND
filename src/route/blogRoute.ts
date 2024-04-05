import express from "express";
import multer from "multer";
// import Blog from "../model/blogModel";
import { create, deleteUser, fetch, update } from "../controller/blogController";



// Import the Cloudinary configuration

const router = express.Router();

// Other blog routes
router.post("/create", create);
router.get("/getAllBlogs", fetch);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteUser);

export default router;
