"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const useController_1 = require("../controller/useController");
const router = express_1.default.Router();
router.post("/register", useController_1.register);
router.post("/login", useController_1.login);
exports.default = router;
