import { BotIcon } from "lucide-react";

const TypingIndicator = () => {
    return (
        <div className="flex justify-start">
            <div className="flex max-w-[80%] flex-row">
                <div className="flex-shrink-0 mr-3">
                    <div className="rounded-full p-2 bg-blue-100">
                        <BotIcon className="h-5 w-5 text-blue-600" />
                    </div>
                </div>
                <div>
                    <div className="rounded-2xl px-4 py-3 bg-blue-50 text-gray-800 rounded-tl-none">
                        <div className="flex space-x-1">
                            <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{
                                animationDelay: '0ms'
                            }}></div>
                            <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{
                                animationDelay: '300ms'
                            }}></div>
                            <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{
                                animationDelay: '600ms'
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TypingIndicator