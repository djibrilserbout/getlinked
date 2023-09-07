import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatMain({messages, room}) {
    return (
        <div className="flex flex-col flex-auto h-full p-6">
            <div
                className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
            >
                <ChatMessages messages={messages}/>
                <ChatInput room={room}/>
            </div>
        </div>
    )
}