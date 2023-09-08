import {useSession} from "next-auth/react";
import {useState} from "react";

export default function OtherProfile({room}) {
    const {data: session, status} = useSession();


    if (session && room) {
        const otherPerson = room.split("-").find((x) => x !== session.user.name)
        return (

            <div
                className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
            >Discussion avec
                <div className="text-sm font-semibold mt-2">{otherPerson}</div>
            </div>
        )
    }
}