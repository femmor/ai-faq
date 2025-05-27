import axios from "axios";

export interface FAQResponse {
    answer: string;
    sources: {
        question: string;
        answer: string;
    }[];
}

export const getFAQAnswer = async (question: string): Promise<FAQResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/faq/search`, {
        question
    });
    return response.data;
};
