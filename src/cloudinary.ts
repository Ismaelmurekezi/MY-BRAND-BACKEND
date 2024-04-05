const cloudinary = require("cloudinary")
require("dotenv").config();

 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_AP_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});


const uploader = async (file:any, res:any) => {
    try {
      const profilePicture = await cloudinary.uploader.upload(file.path, {
        folder: "image",
        use_filename: true,
      });
      return profilePicture;
    } catch (error) {
      console.log(error)
      return res.status(400).json({
       message: error,
      });
    }
  };

 export default uploader
