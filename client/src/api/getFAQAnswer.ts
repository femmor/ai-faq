import { api } from "./axios";
import type { FAQAnswerResponse } from "../types/faq";

export const getFAQAnswer = async (question: string): Promise<FAQAnswerResponse> => {
    try {
        const response = await api.post<FAQAnswerResponse>('/faq/search', {
            question
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching FAQ answer:', error);
        throw error;
    }
};
