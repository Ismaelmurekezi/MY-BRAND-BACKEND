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
exports.refreshToken = exports.logout = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
// Function to generate refresh token
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};
//USER REGISTRATION FUNCTION
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and Confirm Password do not match" });
        }
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        // Create the user
        const userData = yield userModel_1.default.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
        // Generate tokens
        const accessToken = jsonwebtoken_1.default.sign({ data: userData }, ACCESS_TOKEN, { expiresIn: "1h" });
        const refreshToken = generateRefreshToken(userData);
        // Set access token in HTTP-only cookie
        res.cookie("access_token", accessToken, { httpOnly: true });
        res.cookie("refresh_token", refreshToken, { httpOnly: true });
        res.json({ message: "Registered successfully", token: accessToken, refresh_token: refreshToken });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.register = register;
// User login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existUser = yield userModel_1.default.findOne({ email: email });
        if (existUser) {
            const checkPassword = bcrypt_1.default.compareSync(password, existUser.password);
            if (checkPassword) {
                const accessToken = jsonwebtoken_1.default.sign({ data: existUser }, ACCESS_TOKEN, { expiresIn: "1h" });
                const refreshToken = generateRefreshToken(existUser);
                // Set access token in HTTP-only cookie
                res.cookie("access_token", accessToken, { httpOnly: true });
                res.cookie("refresh_token", refreshToken, { httpOnly: true });
                return res.json({ message: `Welcome back: ${existUser.username}`, email, token: accessToken, refresh_token: refreshToken });
            }
            else {
                return res.status(401).json({ message: "Invalid password" });
            }
        }
        else {
            // User with provided email not found
            return res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.login = login;
// User logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clear the access token cookie
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        return res.json({ message: "Logout successful" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.logout = logout;
// Function to generate access token
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ data: user }, ACCESS_TOKEN, { expiresIn: '1h' });
};
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  refreshToken is stored in a cookie named refresh_token
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token missing' });
        }
        // Verify refresh token
        const decodedToken = jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET);
        // Generate a new access token
        const newAccessToken = generateAccessToken(decodedToken.data);
        // Set the new access token in the cookie
        res.cookie('access_token', newAccessToken, { httpOnly: true });
        // Send the new access token to the client
        return res.json({ message: 'Access token refreshed successfully', token: newAccessToken });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.refreshToken = refreshToken;
