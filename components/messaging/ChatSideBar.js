import Profile from "./Profile";
import ConversationList from "./ConversationList";
import OtherProfile from "./OtherProfile";

export default function ChatSideBar({room}) {
    return (
        <div className="flex flex-col py-2 pl-6 pr-2 w-full bg-white flex-shrink-0">
            <Profile/>
        </div>
    )
}