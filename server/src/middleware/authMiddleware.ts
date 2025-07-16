import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from './asyncHandler.js';
import User from '../models/User.js';

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const protect = asyncHandler(async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    let token: string | undefined

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = await User.findById((decoded as { userId: string }).userId).select('-password');
        next();
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
})

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
}

export { protect, adminMiddleware };