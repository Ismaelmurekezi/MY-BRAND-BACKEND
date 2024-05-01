"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import Blog from "../model/blogModel";
const blogController_1 = require("../controller/blogController");
const verifyMiddleware_1 = require("../middleware/verifyMiddleware");
const authmiddleware_1 = require("../middleware/authmiddleware");
// Import the Cloudinary configuration
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - subject
 *         - title
 *         - intro
 *         - subtitle
 *         - content
 *         - caption
 *         - image
 *       properties:
 *         subject:
 *           type: string
 *           description: The subject of the blog post
 *         title:
 *           type: string
 *           description: The title of the blog post
 *         intro:
 *           type: string
 *           description: The introduction of the blog post
 *         subtitle:
 *           type: string
 *           description: The subtitle of the blog post
 *         content:
 *           type: string
 *           description: The content of the blog post
 *         caption:
 *           type: string
 *           description: The caption of the blog post image
 *         image:
 *           type: string
 *           format: binary
 *           description: The image file to upload
 *           contentMediaType: ''
 */
// Other blog routes
/**
 * @swagger
 * /api/blog/getAllBlogs:
 *   get:
 *     summary: Fetching  all blog post
 *     description: This api is used to gets all post in database
 *     tags: [Blogs]
 *     responses:
 *       '200':
 *         description: Blog created successfully
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.get("/getAllBlogs", blogController_1.fetch);
/**
 * @swagger
 * /api/blog/create:
 *   post:
 *     summary: Create a new blog post
 *     description: Create a new blog post with the provided details
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '201':
 *         description: Blog created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post("/create", verifyMiddleware_1.checkAuthorization, blogController_1.create);
router.get('/getBlogById/:id', blogController_1.getBlogById);
/**
 * @swagger
 * /api/blog/update/{id}:
 *   put:
 *     summary: This api is used to update the blog post based on its id from mongodb
 *     description: This api is used to update the blog post based on its id in mongodb
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog post to update
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '201':
 *         description: Blog updated successfully
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.put("/update/:id", verifyMiddleware_1.checkAuthorization, blogController_1.update);
/**
 * @swagger
 * /api/blog/delete/{id}:
 *   delete:
 *     summary: This API is used to delete a blog post based on its ID from MongoDB.
 *     description: This API is used to delete a blog post based on its ID.
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog post to delete
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Blog deleted successfully
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/delete/:id", verifyMiddleware_1.checkAuthorization, blogController_1.deleteUser);
/**
 * @swagger
 * /api/blog/{id}/like:
 *   post:
 *     summary: This api is used to add like to a blog post based on Its id
 *     description: This api is used to add like to a blog post based on Its id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog post to like
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Like added successfully or You unlike this blog
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.post("/:blogId/like", authmiddleware_1.authenticateUser, blogController_1.likeBlog);
/**
 * @swagger
 * /api/blog/{id}/comment:
 *   post:
 *     summary: This api is used to add comment to certain blog post based on Its id
 *     description: This api is used to add like to certain blog post based on Its id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog post to like
 *     responses:
 *       '200':
 *         description: comment added successfully
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Internal server error
 */
router.post("/:blogId/comment", authmiddleware_1.authenticateUser, blogController_1.addComment);
exports.default = router;
