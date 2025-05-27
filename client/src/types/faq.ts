export interface FAQ {
    question: string;
    answer: string;
    similarity: number;
}

export interface FAQAnswerResponse {
    answer: string;
    sources: FAQ[];
}