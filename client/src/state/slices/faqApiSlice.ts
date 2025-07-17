import { FAQ_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const faqApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFAQAnswer: builder.mutation({
            query: (question) => ({
                url: `${FAQ_URL}/search`,
                method: 'POST',
                body: { question },
            }),
            transformResponse: (response) => response.data,
        }),
    }),
});

export const { useGetFAQAnswerMutation } = faqApiSlice;