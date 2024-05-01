"use strict";
//MESSAGEROUTE
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controller/messageController");
const routers = express_1.default.Router();
// Route for creating a new message
/**
 * @swagger
 * /api/messages/createMessage:
 *   post:
 *     summary: This API is for sending a message to the Admin dashboard.
 *     description: This API is for sending a message to the Admin dashboard.
 *     tags:
 *       - Message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - message
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the sender.
 *               email:
 *                 type: string
 *                 description: The email to be sent along with the message to identify the sender.
 *               message:
 *                 type: string
 *                 description: The field holds the message.
 *     responses:
 *       '201':
 *         description: Message sent successfully.
 *       '500':
 *         description: Internal server error.
 */
routers.post("/createMessage", messageController_1.createMessage);
/**
 * @swagger
 * /api/messages/getAllMessages:
 *   get:
 *     summary: This API is for Displaying all message sent.
 *     description: This API is for Displaying all message sent.
 *     tags:
 *       - Message
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       '200':
 *         description: Messages received successfully.
 *       '500':
 *         description: Internal server error.
 */
routers.get("/getAllMessages", messageController_1.getAllMessages);
/**
 * @swagger
 * /api/messages/getMessageById/{id}:
 *   get:
 *     summary: This API is for sending a message to the Admin dashboard.
 *     description: This API is for sending a message to the Admin dashboard.
 *     tags:
 *       - Message
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: This is Id for message to be retrieved
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       '200':
 *         description: Message retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
routers.get("/getMessageById/:id", messageController_1.getMessageById);
/**
 * @swagger
 * /api/messages/deleteMessage/{id}:
 *   delete:
 *     summary: This API is removing  any message based on its id.
 *     description:  This API is removing  any message based on its id.
 *     tags:
 *       - Message
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: This is Id for message to be Deleted
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       '200':
 *         description: Message not exist.
 *       '500':
 *         description: Internal server error.
 */
routers.delete("/deleteMessage/:id", messageController_1.deleteMessage);
routers.put("/updateMessage/:id", messageController_1.updateMessage);
exports.default = routers;
