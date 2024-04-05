import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import route from "./route/blogRoute";
import upload from "./multer";
import router from "./route/userRoute";



const app = express();
app.use(express.json());
app.use(upload.single('image'))
// app.use('api/blog',route)


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


