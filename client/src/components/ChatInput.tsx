import { SendIcon } from "lucide-react"
import { useEffect, useRef, type ChangeEvent, type KeyboardEvent } from "react"

interface ChatInputProps {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onSend: () => void
    disabled: boolean
}

const ChatInput = ({
    value,
    onChange,
    onSend,
    disabled
}: ChatInputProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Focus the input when the component mounts
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Handle Enter key press to send message
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="relative">
            <input ref={inputRef} type="text" value={value} onChange={onChange} onKeyDown={handleKeyDown} disabled={disabled} placeholder="Type your question here..." className="w-full rounded-full border border-gray-300 py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" />
            <button onClick={onSend} disabled={disabled || !value.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors">
                <SendIcon className="h-5 w-5" />
            </button>
        </div>
    )
}
export default ChatInput