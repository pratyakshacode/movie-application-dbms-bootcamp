import { Request, Response } from "express";
import { AppDataSource } from "../config/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { User } from "../entities/User";

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
  //  write the code for registering the user
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    // write your code here for logging in user.
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
