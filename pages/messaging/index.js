import ChatSideBar from "../../components/messaging/ChatSideBar";
import ChatMain from "../../components/messaging/ChatMain";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {get, getDatabase, onValue, ref} from "firebase/database";
import {firebaseApp} from "../../lib/config";
import {useEffect} from "react";

export function Messaging() {
    const router = useRouter()
    const {room} = router.query
    const {data: session} = useSession()

    const [messages, setMessages] = useState({OOO: {username: "none", msg: "jji", createdAt: "OOOO"}});
    const getMessages = async () => {
        const db = getDatabase(firebaseApp)
        return onValue(ref(db, `rooms/${room}/msg`), (snapshot) => {
            if (snapshot.val() == null) {
                setMessages({})
            }
            console.log(snapshot.val())
            setMessages(snapshot.val())

        })
    }
    useEffect(() => {
        if (router.isReady) {
            setMessages([])
            getMessages()
        }
    }, [router.isReady])
    return (
        <div className="flex h-screen antialiased text-gray-800 mb-40">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <ChatSideBar room={room}/>
                <ChatMain room={room} messages={messages}/>
            </div>
        </div>
    )
}

export default Messaging