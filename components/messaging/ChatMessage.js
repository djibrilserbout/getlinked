import {useSession} from "next-auth/react";

const Message = ({msg}) => {
    const {data: session} = useSession()
    if (session && session.user.name !== msg[1].username) {
        return (
            <div className={"p-3 rounded-lg col-start-1 col-end-8"}>
                <div className="flex flex-row items-center">
                    <div
                        className="flex items-center justify-center p-1 rounded-lg text-white bg-indigo-500 flex-shrink-0"
                    >
                        {msg[1].username}
                    </div>
                    <div
                        className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl min-w-max"
                    >
                        <div>{msg[1].msg}</div>
                        <div
                            className="absolute text-xs bottom-0 -right-5 -mb-5 ml-5 text-gray-500 min-w-max"
                        >
                            {new Date(msg[1].createdAt).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
            <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
                <div
                    className="flex items-center justify-center p-1 rounded-lg text-white bg-indigo-500 flex-shrink-0"
                >
                    {msg[1].username}
                </div>
                <div
                    className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                >
                    <div>{msg[1].msg}</div>
                    <div
                        className="absolute text-xs bottom-0 -right-5 -mb-5 ml-5 text-gray-500 min-w-max"
                    >
                        {new Date(msg[1].createdAt).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Message;

