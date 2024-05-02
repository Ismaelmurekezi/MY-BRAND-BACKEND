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
exports.updateMessage = exports.deleteMessage = exports.getMessageById = exports.getAllMessages = exports.createMessage = void 0;
const messageModel_1 = __importDefault(require("../model/messageModel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create a transporter using SMTP transport
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});
// Controller function to create a new message
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, message } = req.body;
        console.log(req.body.email);
        // Create a new message document
        const newMessage = new messageModel_1.default({ username, email, message });
        yield newMessage.save();
        yield transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            replyTo: email,
            subject: 'New message from user',
            text: `
        Username: ${username}
        Email: ${email}
        Message: ${message}
      `,
        });
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createMessage = createMessage;
// Controller function to get all messages
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield messageModel_1.default.find();
        console.log(req.url);
        res.status(200).json(messages);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllMessages = getAllMessages;
const getMessageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageId = req.params.id;
        const message = yield messageModel_1.default.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json(message);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getMessageById = getMessageById;
// Controller function to delete a message by ID
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Find the message by ID and delete it
        yield messageModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Message deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteMessage = deleteMessage;
// Controller function to update a message by ID
const updateMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // const { username, email, message } = req.body;
        const messageData = req.body;
        // Find the message by ID and update it
        const updatedMessage = yield messageModel_1.default.findByIdAndUpdate(id, messageData, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json(updatedMessage);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateMessage = updateMessage;
