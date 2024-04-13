


import { Request, Response } from "express";
import User from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || "";
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || "";

// Function to generate refresh token
const generateRefreshToken = (user: any) => {
  return jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};

// User registration
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
      const accessToken = jwt.sign({ data: userData }, ACCESS_TOKEN, { expiresIn: "1h" });
      const refreshToken = generateRefreshToken(userData);

      // Set access token in HTTP-only cookie
      res.cookie("access_token", accessToken, { httpOnly: true });
       res.cookie("refresh_token", refreshToken, { httpOnly: true });

      res.json({ message: "register successfully ", token: accessToken, refresh_token: refreshToken });
    }
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

// User login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email: email });

    if (existUser) {
      const checkPassword = bcrypt.compareSync(password, existUser.password);

      if (checkPassword) {
        const accessToken = jwt.sign({ data: existUser }, ACCESS_TOKEN, { expiresIn: "1h" });
        const refreshToken = generateRefreshToken(existUser);

        // Set access token in HTTP-only cookie
        res.cookie("access_token", accessToken, { httpOnly: true });
         res.cookie("refresh_token", refreshToken, { httpOnly: true });

        return res.json({ message: `Welcome back: ${existUser.username}`, token: accessToken, refresh_token: refreshToken });
      } else {
      
        return res.status(401).json({ message: "Invalid password" });
      }
    } else {
      // User with provided email not found
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};





// Function to generate access token
 const generateAccessToken = (user: any) => {
  return jwt.sign({ data: user }, ACCESS_TOKEN, { expiresIn: '1h' });
};

export const refreshToken = async (req: Request, res: Response) => {
  try {

     //  refreshToken is stored in a cookie named refresh_token
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token missing' });
    }

    // Verify refresh token
    const decodedToken: any = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    // Generate a new access token
    const newAccessToken = generateAccessToken(decodedToken.data);

    // Set the new access token in the cookie
    res.cookie('access_token', newAccessToken, { httpOnly: true });

    // Send the new access token to the client
    return res.json({ message: 'Access token refreshed successfully', token: newAccessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};














