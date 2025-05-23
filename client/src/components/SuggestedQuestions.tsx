interface SuggestedQuestionsProps {
    questions: string[],
    onQuestionClick: (question: string) => void;
}

const SuggestedQuestions = ({ questions, onQuestionClick }: SuggestedQuestionsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {questions.map((question, index) => <button key={index} onClick={() => onQuestionClick(question)} className="text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors text-sm cursor-pointer">
                {question}
            </button>)}
        </div>
    )
}
export default SuggestedQuestions