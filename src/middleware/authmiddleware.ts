

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN || "";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
    // const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not provided" });
  }

  try {
    const decodedToken: any = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    (req as any).user = decodedToken.data;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid access token" });
  }
};
