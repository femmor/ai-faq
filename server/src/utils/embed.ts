import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})
export async function generateEmbedding(text: string): Promise<number[]> {
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: text
        });

        if (response.data && response.data.length > 0) {
            return response.data[0].embedding;
        } else {
            throw new Error("No embedding data returned");
        }
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw error;
    }
}