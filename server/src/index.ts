import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.ts';
import faqRoutes from './routes/faq.ts';
import authRoutes from './routes/authRoutes.ts';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json())

app.use('/api/faq', faqRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});