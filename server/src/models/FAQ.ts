import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    answer: {
        type: String,
        required: true,
        trim: true,
    },
    embedding: {
        type: [Number],
        required: true,
    },
}, {
    timestamps: true,
});

const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;