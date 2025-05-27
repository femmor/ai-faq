import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.ts';
import faqRoutes from './routes/faq.ts';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API is running...");
})

app.use('/api/faq', faqRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});