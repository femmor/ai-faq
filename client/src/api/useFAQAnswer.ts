import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { FAQAnswerResponse } from '../types/faq';

export const useFAQAnswer = () => {
    return useMutation({
        mutationFn: async (question: string): Promise<FAQAnswerResponse> => {
            const response = await axios.post<FAQAnswerResponse>(
                `${import.meta.env.VITE_API_BASE_URL}/faq/search`,
                { question }
            );
            return response.data;
        },
        onError: (error) => {
            console.error('Error fetching FAQ answer:', error);
        }
    })
}