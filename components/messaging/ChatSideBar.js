import Profile from "./Profile";
import ConversationList from "./ConversationList";
import OtherProfile from "./OtherProfile";

export default function ChatSideBar({room, participants}) {
    return (


        <div className="flex py-2 pl-6 pr-2 w-full rounded-2xl bg-gray-100 flex-shrink-0 ">
            <div className={"text-xl"}>Chat entre :</div>
            {
                participants.map(participant => <div className={"font-bold text-xl mr-2"}
                                                     key={participant}>{participant} </div>)
            }
        </div>

    )
}