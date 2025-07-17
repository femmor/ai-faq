import User, { IUser } from '../models/User.js';
import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @returns {Object} User details and JWT token in cookie
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email }) as IUser | null;

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });

        if (user) {
            generateToken(res, user._id.toString());

            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        }

    } catch (error) {
        res.status(400).json({ message: 'Invalid user credentials' });
    }
})


/**
 * @desc Login user and return JWT token
 * @route POST /api/auth/login
 * @access Public
 * @returns {Object} User details and JWT token in cookie
 */
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }) as IUser | null;

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id.toString());

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
});

/**
 * @desc Logout user by clearing the JWT token cookie
 * @route POST /api/auth/logout
 * @access Public
 * @returns {Object} Success message
 */
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0), // Set cookie to expire immediately
    });

    res.status(200).json({ message: 'Logged out successfully' });
});

export {
    registerUser,
    loginUser,
    logoutUser
}