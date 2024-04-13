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
exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//user registration
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const userData = yield userModel_1.default.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
        if (userData) {
            const credential = jsonwebtoken_1.default.sign({ data: userData }, "tokenkeytosignin", {
                expiresIn: "1h",
            });
            res.json({ message: "register successfully ", token: credential });
        }
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.register = register;
//user login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        const existUser = yield userModel_1.default.findOne({ email: email });
        if (existUser) {
            const checkPassword = bcrypt_1.default.compareSync(password, existUser.password);
            if (checkPassword) {
                const credential = jsonwebtoken_1.default.sign({ data: existUser }, "tokenkeytosignin", {
                    expiresIn: "1h",
                });
                res.json({ message: `Welcome back: ${existUser.username}`, token: credential });
            }
        }
        res.json({ message: "Invalid credentials" });
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.login = login;
