import { Request, Response } from "express";
import User from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//user registration

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userData = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
      
    if (userData) {
      const credential = jwt.sign({ data: userData }, "tokenkeytosignin", {
        expiresIn: "1h",
          });
      res.json(
    { message: "register successfully ",token : credential }
    );
    }
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

//user login

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password,username } = req.body;
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      const checkPassword = bcrypt.compareSync(password, existUser.password);
      if (checkPassword) {
        const credential = jwt.sign({ data: existUser }, "tokenkeytosignin", {
          expiresIn: "1h",
        });
        res.json({ message: `Welcome back: ${existUser.username}`, token: credential });
      } 
    } 
      res.json({ message: "Invalid credentials" });
    
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

























