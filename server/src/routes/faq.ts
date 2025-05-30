import express from 'express';
import { createFAQ, searchFAQ } from '../controllers/faqController.js';
import { Request, Response, NextFunction } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
const router = express.Router();

router.post(
    '/',
    authenticate,
    authorize(['admin']),
    async (req, res, next) => {
        try {
            await createFAQ(req, res);
        } catch (err) {
            next(err);
        }
    }
);

router.post('/search', (req: Request, res: Response, next: NextFunction) => {
    searchFAQ(req, res).catch(next);
});

export default router;
