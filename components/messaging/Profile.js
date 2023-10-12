import {useSession} from "next-auth/react";

export default function Profile() {
    const {data: session, status} = useSession();
    const basicPicture = "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI";

    if (session) {
        return (

            <div
                className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
            >
                <div className="h-20 w-20 rounded-full border overflow-hidden">
                    <img
                        src={session.user.image ?? basicPicture}
                        alt="Avatar"
                        className="h-full w-full"
                    />
                </div>
                <div className="text-sm font-semibold mt-2">{session.user.name}</div>
            </div>
        )
    }
}