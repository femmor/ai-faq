import express, { NextFunction, Request, Response } from 'express';
import { loginUser, registerUser } from '../controllers/authController.ts';

const router = express.Router();

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    registerUser(req, res).catch(next);
});
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    loginUser(req, res).catch(next);
});

export default router;