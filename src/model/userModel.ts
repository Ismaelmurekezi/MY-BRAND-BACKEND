import mongoose from "mongoose";

//User schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },

    password: {
        type: String,
        required: true
    },
        createdAt: {
        type: Date,
        default: Date.now,
      }

    
})

export default mongoose.model("User", userSchema);