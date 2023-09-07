import Profile from "./Profile";
import ConversationList from "./ConversationList";
import OtherProfile from "./OtherProfile";

export default function ChatSideBar({room}) {
    return (
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <Profile/>
            <OtherProfile room={room}/>
        </div>
    )
}