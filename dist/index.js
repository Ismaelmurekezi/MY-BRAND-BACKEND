"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const blogRoute_1 = __importDefault(require("./route/blogRoute"));
const multer_1 = __importDefault(require("./multer"));
const userRoute_1 = __importDefault(require("./route/userRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(multer_1.default.single('image'));
// app.use('api/blog',route)
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT || "5000");
const MONGOURL = process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase";
mongoose_1.default.connect(MONGOURL).then(() => {
    console.log("Database connected successful");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.log(error);
});
app.use("/api/blog", blogRoute_1.default);
app.use("/api/user", userRoute_1.default);
