"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const useController_1 = require("../controller/useController");
const router = express_1.default.Router();
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: This API is for registering a user to give permission for certain tasks.
 *     description: This API is for registering a user to give permission for certain tasks.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               username:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 description: The email to be used by the user to log in.
 *               password:
 *                 type: string
 *                 description: The user's password to access certain parts or functionality.
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmation of the password, which must match the password.
 *     responses:
 *       '200':
 *         description: User registered successfully.
 */
router.post("/register", useController_1.register);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: This API is for login user to the site .
 *     description: This API is for login user to the site .
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email to be used by the user to log in.
 *               password:
 *                 type: string
 *                 description: The user's password to access certain parts or functionality.
 *     responses:
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Internal error server.
 */
router.post("/login", useController_1.login);
router.post('/logout', useController_1.logout);
router.get("/getAllUsers", useController_1.getAllUsers);
router.get("/getUserById/:id", useController_1.getUserById);
router.put("/updateUserById/:id", useController_1.updateUserById);
router.delete("/deleteUser/:id", useController_1.deleteUser);
router.post('/refresh-token', useController_1.refreshToken);
exports.default = router;
