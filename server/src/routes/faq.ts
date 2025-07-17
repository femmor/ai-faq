import express from 'express';
import { createFAQ, searchFAQ } from '../controllers/faqController.js';
import { protect, adminMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', createFAQ);

router.post('/search', searchFAQ);

export default router;
