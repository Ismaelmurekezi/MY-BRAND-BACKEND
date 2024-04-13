import { Request as ExpressRequest } from 'express';

// Extend the Request interface to include the user property
declare module 'express' {
  interface Request {
    user?: {
      id: string; // Assuming user ID is a string
      // Add any other properties you need from the user object
    };
  }
}


