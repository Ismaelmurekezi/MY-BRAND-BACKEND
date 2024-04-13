
import mongoose from "mongoose";
import User from "../model/userModel"



const blogSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required:true
  },
  image: {
    type: String,
    required:true
  },
    likes: {
  type: Number,
  default: 0
},
likedBy: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],
  // comments: [commentSchema]
    comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
        userEmail: {
    type: String,
  },
  
      text: {
        type: String,
        required: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.model("Blog", blogSchema);



// const commentSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   text: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   userEmail: {
//     type: String,
//   },
// });