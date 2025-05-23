
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import "../styles/ChatInterface.css"
import { BotIcon, InfoIcon } from "lucide-react";
import ChatMessage from "./ChatMessage";
import type { Message } from "../types/Message";
import TypingIndicator from "./TypingIndicator";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatInput from "./ChatInput";

// Sample FAQ data
const faqData = {
    'What are your business hours?': "We're open Monday through Friday from 9 AM to 6 PM, and Saturdays from 10 AM to 4 PM. We're closed on Sundays and major holidays.",
    'Do you offer refunds?': "Yes, we offer full refunds within 30 days of purchase if you're not completely satisfied with your product.",
    'How can I track my order?': "You can track your order by logging into your account and visiting the 'Order History' section, or by using the tracking number provided in your shipping confirmation email.",
    'What payment methods do you accept?': 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.'
};

const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([{
        id: 1,
        content: "Hello! I'm your FAQ assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date()
    }]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

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

        // Find answer in FAQ data or provide default response
        setTimeout(() => {
            setIsTyping(false);
            let answer = faqData[message as keyof typeof faqData];
            if (!answer) {
                // Check for partial matches
                const lowerCaseMessage = message.toLowerCase();
                for (const [question, response] of Object.entries(faqData)) {
                    if (question.toLowerCase().includes(lowerCaseMessage) || lowerCaseMessage.includes(question.toLowerCase())) {
                        answer = response;
                        break;
                    }
                }

                // If still no match, provide default response
                if (!answer) {
                    answer = "I don't have information on that specific question. Can I help you with something else from our FAQ?";
                }
            }
            const aiMessage: Message = {
                id: messages.length + 2,
                content: answer,
                sender: "ai",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
        }, 1500);
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
                        <SuggestedQuestions questions={Object.keys(faqData)} onQuestionClick={handleQuestionClick} />
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