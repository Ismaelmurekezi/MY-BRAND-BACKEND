import express from "express"
import { login, register,refreshToken, logout, getAllUsers, getUserById, updateUserById, deleteUser } from "../controller/useController"




const router = express.Router()

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


router.post("/register", register)

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

router.post("/login", login)
router.post('/logout', logout)
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.put("/updateUserById/:id", updateUserById);
router.delete("/deleteUser/:id", deleteUser);
router.post('/refresh-token', refreshToken);

export default router
