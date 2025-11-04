"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "";
const checkAuthorization = (req, res, next) => {
    // Get access token from cookies
    // const accessToken = req.cookies.access_token;
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
        return res.status(401).json({ message: "Access token not provided" });
    }
    try {
        // Verify the access token
        const decodedToken = jsonwebtoken_1.default.verify(accessToken, ACCESS_TOKEN);
        // GEtting user information from the token payload
        const user = decodedToken.data;
        // Ensure that user information have expected username
        if (!user || !user.username) {
            return res.status(401).json({ message: "Invalid access token" });
        }
        if (user.email === "ismael@gmail.com") {
            next();
        }
        else {
            return res.status(403).json({ message: "Unauthorized access" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Access token expired " });
    }
};
exports.checkAuthorization = checkAuthorization;
