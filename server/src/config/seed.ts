import mongoose from "mongoose";
import dotenv from "dotenv";
import { generateEmbedding } from "../utils/embed.ts";
import { sampleFAQs } from "../utils/sample-faqs.ts";
import FAQ from "../models/FAQ.ts";

dotenv.config();

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("Connected to MongoDB");

        await FAQ.deleteMany({});
        console.log("Existing FAQs deleted");

        for (const faq of sampleFAQs) {
            const embedding = await generateEmbedding(faq.question);
            const newFAQ = new FAQ({
                question: faq.question,
                answer: faq.answer,
                embedding: embedding
            });
            await newFAQ.save();
        }
        console.log("Sample FAQs seeded successfully");
    } catch (error) {
        console.log("Error seeding database:", error);
        process.exit(1);
    }
}

seedDB()