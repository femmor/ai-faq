
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import "../styles/ChatInterface.css"
import { BotIcon, InfoIcon } from "lucide-react";
import ChatMessage from "./ChatMessage";
import type { Message } from "../types/Message";
import TypingIndicator from "./TypingIndicator";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatInput from "./ChatInput";
import { sampleFAQs } from "../utils/sampleFaqs";
import { useGetFAQAnswerMutation } from "../state/slices/faqApiSlice";

const sampleQuestions = sampleFAQs.slice(3).map(faq => faq.question);

const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([{
        id: 1,
        content: "Hello! I'm your FAQ assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date()
    }]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const [getFAQAnswer] = useGetFAQAnswerMutation();

    console.log(getFAQAnswer)

    // Function to handle sending a message
    const handleSendMessage = (message: string) => {
        if (!message.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: messages.length + 1,
            content: message,
            sender: "user",
            timestamp: new Date()
        };

        // Update messages state with user message
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // Simulate AI thinking
        setIsTyping(true);

        getFAQAnswer(message)
            .then((data) => {
                const aiMessage: Message = {
                    id: messages.length + 2,
                    content: data.answer || "Sorry, I couldn't find an answer to that.",
                    sender: "ai",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMessage]);
            })
            .catch(() => {
                const fallback: Message = {
                    id: messages.length + 2,
                    content: "Sorry, I couldn't retrieve an answer right now. Please try again later.",
                    sender: "ai",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, fallback]);
            })
            .finally(() => {
                setIsTyping(false);
            });
    }

    // Function to handle clicking a suggested question
    const handleQuestionClick = (question: string) => {
        handleSendMessage(question);
    }

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages]);

    return (
        <div className="container">
            <div className="chat-interface">
                {/* Header */}
                <div className="chat-interface-header">
                    <div className="chat-interface-header-icon-container">
                        <BotIcon className="chat-interface-header-icon" />
                    </div>
                    <div>
                        <h1 className="chat-interface-title">FAQ Assistant</h1>
                        <p className="chat-interface-subtitle">
                            Ask me anything about our products or services
                        </p>
                    </div>
                </div>
                {/* Chat messages area */}
                <div className="chat-messages">
                    {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
                    {isTyping && <TypingIndicator />}

                    {/* Empty div for scrolling to bottom */}
                    <div ref={messagesEndRef} />
                </div>
                {/* Show suggested questions if only the initial message exists */}
                {messages.length === 1 &&
                    <div className="chat-interface-suggested-questions-container">
                        <div className="chat-interface-suggested-question">
                            <InfoIcon className="chat-interface-info-icon" />
                            <span>Here are some questions you can ask:</span>
                        </div>
                        <SuggestedQuestions questions={sampleQuestions} onQuestionClick={handleQuestionClick} />
                    </div>
                }

                {/* Input area */}
                <div className="chat-interface-input-container">
                    <ChatInput value={inputValue} onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} onSend={() => handleSendMessage(inputValue)} disabled={isTyping} />
                </div>
            </div>
        </div>
    )
}
export default ChatInterface