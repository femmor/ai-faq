import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.ts';
import { Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET!

const registerUser = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export {
    registerUser,
    loginUser
}