"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("./multer"));
const blogRoute_1 = __importDefault(require("./route/blogRoute"));
const userRoute_1 = __importDefault(require("./route/userRoute"));
const messageRoute_1 = __importDefault(require("./route/messageRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://127.0.0.1:5500', 'https://myportofolio-brand.netlify.app', 'http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
}));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MY BRAND api Doc",
            version: "1.0.0",
            description: "This is REST API for my portfolio which I build using Express js and mongoo DB. It has differnt end points such as Users endpoints, Blog CRUD operations endpoints and messaging endpoints",
            contact: {
                email: "ismaelmurekezi1@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./src/route/*.ts"],
};
const specs = (0, swagger_jsdoc_1.default)(options);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.use(express_1.default.json());
app.use(multer_1.default.single('image'));
app.use((0, cookie_parser_1.default)());
// app.use('api/blog',route)
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT || "5000");
const MONGOURL = process.env.MONGO_URL || "mongodb+srv://ishmure:ismael123@cluster0.ty7yfds.mongodb.net/mybrand?retryWrites=true&w=majority&appName=Cluster0";
mongoose_1.default.connect(MONGOURL).then(() => {
    console.log("Database connected successful");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.log(error);
});
app.use('/', (req, res) => {
    return res.json({ message: "Welcome this is Rest API for my brand site " });
});
app.use("/api/blog", blogRoute_1.default);
app.use("/api/user", userRoute_1.default);
app.use('/api/messages', messageRoute_1.default);
