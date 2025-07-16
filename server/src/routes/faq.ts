import express from 'express';
import { createFAQ, searchFAQ } from '../controllers/faqController.js';
import { Request, Response, NextFunction } from 'express';
import { protect, adminMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protect, adminMiddleware, createFAQ);

router.post('/search', protect, adminMiddleware, searchFAQ);

export default router;
