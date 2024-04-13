import Blog from "../model/blogModel";
import { Request, Response,NextFunction } from "express";
import uploader from "../cloudinary";
import User from "../model/userModel";




//Creating blog post

export const create = async (req:Request, res:Response) => {
  try {

     if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await uploader(req.file,res)

    // Return the URL of the uploaded image

    const { title,subject,subtitle,intro,caption,content }=req.body;
   
    const blogData = new Blog({ subject,intro,caption,content,subtitle,title, image: result.secure_url });
    
    const blogExist = await Blog.findOne({ title });

    if (blogExist) {
      return res.status(400).json({ message: "Blog already exists" });
    }

    const savedBlog = await blogData.save();
    res.status(201).json(savedBlog);
  } catch (error) {
     console.log(error)
    res.status(500).json({ error: "Internal server error" });
  }
};

//Getting blog post
export const fetch = async (req:Request, res:Response) => {
  try {
    const blogs = await Blog.find().populate("comments.user");;
    if (blogs.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blogs);
  } catch (error) {
   
    res.status(500).json({ error: "Internal server error" });
  }
};



// Update blog
export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blogExist = await Blog.findOne({ _id: id });
    if (!blogExist) {
      return res.status(404).json({ message: "Blog Not found" });
    }

    let updateData = req.body; // Copy the request body

    if (req.file) {
      // Upload image to Cloudinary if a new file is provided
      const result = await uploader(req.file, res);
      updateData.image = result.secure_url;
    }

    const updateBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(201).json(updateBlog);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


//deleting blog
export const deleteUser = async (req:Request, res:Response) => {
  try {
    const id = req.params.id;
    const blogExist = await Blog.findById({ _id: id });
    if (!blogExist) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await Blog.findByIdAndDelete(id);
    res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};







export const addComment = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    //  user data is in req.user
    const userId = (req as any).user._id; 
    const blogId = req.params.blogId;

    // Find the blog post by ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }


     // Fetch the user's email using their userId
    const user = await User.findById(userId);
    const userEmail = user?.email
    console.log(userEmail)


    // Create a new comment object
    const newComment = {
      user: userId,
     userEmail,
      text,
    };

    // Add the comment to the blog post
    blog.comments.push(newComment);

    // Save the updated blog post
    const updatedBlog = await blog.save();

    res.status(200).json({ message: "Comment added successfully", blog: updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

















