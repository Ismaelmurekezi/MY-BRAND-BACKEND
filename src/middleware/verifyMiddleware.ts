import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || "";

export const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
  // Get access token from cookies
  // const accessToken = req.cookies.access_token;
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not provided" });
  }

  try {
    // Verify the access token
    const decodedToken: any = jwt.verify(accessToken, ACCESS_TOKEN);

    // GEtting user information from the token payload
    const user = decodedToken.data;

    // Ensure that user information have expected username
    if (!user || !user.username) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    if (user.email === "kamali@gmail.com") {
      next();
    } else {
    
      return res.status(403).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Access token expired " });
  }
};



