"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN || "";
const authenticateUser = (req, res, next) => {
    var _a;
    const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    // const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res.status(401).json({ message: "Access token not provided" });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(accessToken, ACCESS_TOKEN_SECRET);
        req.user = decodedToken.data;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid access token" });
    }
};
exports.authenticateUser = authenticateUser;
