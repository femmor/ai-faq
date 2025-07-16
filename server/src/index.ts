import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import faqRoutes from './routes/faq.js';
import authRoutes from './routes/authRoutes.js';
import { logInfo } from "./utils/logger.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json())

app.use('/api/faq', faqRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`<======== Backend Server ========>`);
    logInfo(`Server is running on port ${PORT}`);
});