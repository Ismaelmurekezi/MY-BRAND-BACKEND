import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import route from "./route/blogRoute";
import upload from "./multer";
import router from "./route/userRoute";
import cookieParser from "cookie-parser";
import routers from "./route/messageRoute";
import cors from "cors"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

const app = express();

 const options: any = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MY BRAND api Doc",
      version: "1.0.0",
      description:
        "This is REST API for my portfolio which I build using Express js and mongoo DB. It has differnt end points such as Users endpoints, Blog CRUD operations endpoints and messaging endpoints",
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

const specs = swaggerJSDoc(options);

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs)
);



app.use(express.json());
app.use(upload.single('image'))
app.use(cookieParser()); 
// app.use('api/blog',route)
app.use(cors({
  origin: 'http://127.0.0.1:5500', 
    credentials: true, 
}));


dotenv.config();
const PORT = parseInt(process.env.PORT || "5000");
const MONGOURL = process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase";


mongoose.connect(MONGOURL).then(() => {
    console.log("Database connected successful");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

})   .catch(error => {
        console.log(error)
})

app.use("/api/blog", route);
app.use("/api/user", router);
app.use('/api/messages',routers)




