import express from 'express';
import { searchFAQ } from '../controllers/faqController.ts';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.post('/search', (req: Request, res: Response, next: NextFunction) => {
    searchFAQ(req, res).catch(next);
});

export default router;
