"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import Blog from "../model/blogModel";
const blogController_1 = require("../controller/blogController");
// Import the Cloudinary configuration
const router = express_1.default.Router();
// Other blog routes
router.post("/create", blogController_1.create);
router.get("/getAllBlogs", blogController_1.fetch);
router.put("/update/:id", blogController_1.update);
router.delete("/delete/:id", blogController_1.deleteUser);
exports.default = router;
