import { Request, Response } from 'express';
import FAQ from '../models/FAQ.ts';
import { generateEmbedding } from '../utils/embed.ts';
import { cosineSimilarity } from '../utils/similarity.ts';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const searchFAQ = async (req: Request, res: Response) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question required' });

    try {
        const userEmbedding = await generateEmbedding(question);
        const faqs = await FAQ.find();

        const results = faqs.map((faq) => {
            const similarity = cosineSimilarity(userEmbedding, faq.embedding);
            return { ...faq.toObject(), similarity };
        });

        const topMatches = results.sort((a, b) => b.similarity - a.similarity).slice(0, 3);
        const context = topMatches.map((m) => `Q: ${m.question}\nA: ${m.answer}`).join("\n\n");

        const gptRes = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful FAQ assistant. Answer only from the provided context." },
                { role: "user", content: `Question: ${question}\n\nContext:\n${context}` }
            ],
        });

        const answer = gptRes.choices[0].message.content;
        res.json({ answer, sources: topMatches });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Search failed' });
    }
};
