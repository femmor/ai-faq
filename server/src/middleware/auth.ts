import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticate = (req: Request & { user?: any }, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1] as string;

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
}

const authorize = (roles: string[]): any => {
    return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user?.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}

export { authenticate, authorize };