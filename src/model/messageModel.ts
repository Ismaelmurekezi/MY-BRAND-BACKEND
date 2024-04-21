import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    username: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
        },
    message: {
        type: String,
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },

})

export default mongoose.model("Messages", messageSchema);