import Message from "./Message";
import ChatForm from "./ChatForm";

const ChatBox = ({messages, db}) => {
    return (
        <div className={"chatbox-wrapper"}>
            <div className={"chatbox"}>
                <h2>Me contacter</h2>
                <div className={"bubbles-wrapper"}>
                    {messages != null && Object.entries(messages).map(msg => <Message key={msg[0]} msg={msg}/>)}
                </div>
                <ChatForm/>
            </div>
        </div>
    )
}
export default ChatBox;