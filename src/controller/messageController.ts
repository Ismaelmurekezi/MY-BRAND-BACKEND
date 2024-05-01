import express, { Request, Response } from "express"
import Message from "../model/messageModel"
import nodemailer from "nodemailer"


// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASSWORD, 
  },
});


// Controller function to create a new message
export const createMessage = async (req: Request, res: Response) => {
    try {
        const { username, email, message } = req.body;
        
     console.log(req.body.email)
        // Create a new message document
        const newMessage = new Message({ username, email, message });
        await newMessage.save();

     await transporter.sendMail({
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Controller function to get all messages
export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const getMessageById = async (req: Request, res: Response) => {
    try {
   
        const messageId = req.params.id;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};



// Controller function to delete a message by ID
export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Find the message by ID and delete it
        await Message.findByIdAndDelete(id);

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller function to update a message by ID
export const updateMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // const { username, email, message } = req.body;
        const messageData = req.body;

        // Find the message by ID and update it
        const updatedMessage = await Message.findByIdAndUpdate(id, messageData, { new: true });

        if (!updatedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.status(200).json(updatedMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

