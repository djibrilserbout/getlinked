import ChatMessage from "./ChatMessage";

export default function ChatMessages({messages}) {
    return (
        <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                    {messages != null && Object.entries(messages).map(msg => <ChatMessage key={msg[0]} msg={msg}/>)}

                </div>
            </div>
        </div>
    )
}