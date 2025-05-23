import { BotIcon, UserIcon } from "lucide-react";
import "../styles/ChatMessage.css";

interface ChatMessageProps {
    message: {
        id: number;
        content: string;
        sender: 'user' | 'ai';
        timestamp: Date;
    }
}

const ChatMessage = ({ message }: ChatMessageProps) => {
    const {
        content,
        sender,
        timestamp
    } = message;
    const isAi = sender === 'ai';

    return (
        <div className={`chat-message ${isAi ? 'justify-start' : 'justify-end'}`}>
            <div className={`flex max-w-[80%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex-shrink-0 ${isAi ? 'mr-3' : 'ml-3'}`}>
                    <div className={`rounded-full p-2 ${isAi ? 'bg-blue-100' : 'bg-gray-200'}`}>
                        {isAi ? <BotIcon className="h-5 w-5 text-blue-600" /> : <UserIcon className="h-5 w-5 text-gray-600" />}
                    </div>
                </div>
                <div>
                    <div className={`rounded-2xl px-4 py-3 ${isAi ? 'bg-blue-50 text-gray-800 rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                        <p className="whitespace-pre-wrap">{content}</p>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${isAi ? 'text-left' : 'text-right'}`}>
                        {new Date(timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatMessage