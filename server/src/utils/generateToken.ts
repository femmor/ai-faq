import { Response } from "express";
import jwt from "jsonwebtoken";

// Function to generate JWT token and set it in an HTTP-only cookie
const generateToken = (res: Response, userId: string) => {
    // Generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: "30d",
    });

    // Set token in http Only cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

export default generateToken;