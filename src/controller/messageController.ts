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
      subject: `📩 New Contact Message from ${username}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px; border-bottom: 3px solid #007bff; padding-bottom: 10px;">📧 New Contact Message</h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #555; margin-bottom: 8px;">👤 From:</h3>
              <p style="background-color: #f8f9fa; padding: 10px; border-radius: 5px; margin: 0; font-size: 16px;">${username}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #555; margin-bottom: 8px;">📧 Email:</h3>
              <p style="background-color: #f8f9fa; padding: 10px; border-radius: 5px; margin: 0; font-size: 16px;">
                <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
              </p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #555; margin-bottom: 8px;">💬 Message:</h3>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff; font-size: 16px; line-height: 1.5;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="color: #666; font-size: 14px; margin: 0;">📅 Received on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
              <a href="mailto:${email}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">✉️ Reply to ${username}</a>
            </div>
          </div>
        </div>
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
        console.log(req.url)
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

