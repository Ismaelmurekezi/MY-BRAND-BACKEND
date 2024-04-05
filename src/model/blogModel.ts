import mongoose from "mongoose";

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
  }
});

export default mongoose.model("blogs", blogSchema);