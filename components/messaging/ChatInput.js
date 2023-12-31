import {get, getDatabase, push, ref, serverTimestamp, set} from "firebase/database";
import {firebaseApp} from "../../lib/config";
import {useSession} from "next-auth/react";
import {useState} from "react";

export default function ChatInput({room}) {
    const { data: session } = useSession()
    const [message, setMessage] = useState('');
    const handleChange = event => {
        setMessage(event.target.value);
    };
    async function handleSubmit(e) {
        e.preventDefault();

        const db = getDatabase(firebaseApp)
        const newMsg = push(ref(db, `rooms/${room}/msg`))
        set(newMsg, {
            username: session.user.name,
            msg: e.target.message.value,
            createdAt: serverTimestamp()
        });
        setMessage('')
    }
    return (
        <form
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
            onSubmit={handleSubmit}
        >
            <div className="flex-grow ml-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        name={"message"}
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        placeholder={"Ex: Bonjour, comment allez-vous ?"}
                        value={message}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="ml-4">
                <button
                    type={"submit"}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                    <span>Envoyer</span>
                    <span className="ml-2">
                  <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
                </button>
            </div>
        </form>
    )
}