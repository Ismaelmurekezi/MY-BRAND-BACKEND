


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

//USER REGISTRATION FUNCTION

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password and Confirm Password do not match" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create the user
    const userData = await User.create({
      username: username,
      email: email,
      password: hashedPassword,

    });

    // Generate tokens
    const accessToken = jwt.sign({ data: userData }, ACCESS_TOKEN, { expiresIn: "45m" });
    const refreshToken = generateRefreshToken(userData);

    // Set access token in HTTP-only cookie
    res.cookie("access_token", accessToken, { httpOnly: true });
    res.cookie("refresh_token", refreshToken, { httpOnly: true });

    res.json({ message: "Registered successfully", token: accessToken, refresh_token: refreshToken });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// User login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
  
    const existUser = await User.findOne({ email: email});

    if (existUser) {
      const checkPassword = bcrypt.compareSync(password, existUser.password);

      if (checkPassword) {
        const accessToken = jwt.sign({ data: existUser }, ACCESS_TOKEN, { expiresIn: "45m" });
        const refreshToken = generateRefreshToken(existUser);

        // Set access token in HTTP-only cookie
        res.cookie("access_token", accessToken, { httpOnly: true });
         res.cookie("refresh_token", refreshToken, { httpOnly: true });

        return res.json({ message: `Welcome back: ${existUser.username}`,email, token: accessToken, refresh_token: refreshToken });
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





// User logout
export const logout = async (req: Request, res: Response) => {
  try {
    // Clear the access token cookie
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return res.json({ message: "Logout successful" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// Controller function to get all registered users
export const getAllUsers = async (req: Request, res: Response) => {
  try {


        const page = parseInt(req.query.page as string) || 1; 
        const perPage = 4; 
        const skip = (page - 1) * perPage; 

    const users = await User.find().skip(skip).limit(perPage); 
    
    // const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Send the list of users as a response
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get user to be edited  
export const getUserById = async (req: Request, res: Response) => {
    try {
   
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Controller function to delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Find the message by ID and delete it
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller function to update user information by ID
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user data
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      // Hash the new password
      const hashedPassword = bcrypt.hashSync(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user data
    await user.save();

    // Send response
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};




// Function to generate access token
 const generateAccessToken = (user: any) => {
  return jwt.sign({ data: user }, ACCESS_TOKEN, { expiresIn: '45m' });
};

export const refreshToken = async (req: Request, res: Response) => {
  try {

     //  refreshToken is stored in a cookie named refresh_token
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token missing' });
    }

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














