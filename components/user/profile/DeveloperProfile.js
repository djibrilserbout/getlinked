import Image from "next/image";
import Link from "next/link";
import {Button} from "react-bootstrap";
import ModifyProfileForm from "./ModifyProfileForm";
import {getDatabase, onValue, push, ref, set, get} from "firebase/database";
import {firebaseApp} from "../../../lib/config";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

const DeveloperProfile = ({user, handleClose, handleShow, handleUpdate, isAdmin, isMine, show}) => {
    const {data: session} = useSession()
    const [room, setRoom] = useState("");

    useEffect(() => {

            loadRoom()

    }, [])
    function loadRoom() {
        const db = getDatabase(firebaseApp)
        get(ref(db, `rooms/${session.user.name}-${user.name}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setRoom(`${session.user.name}-${user.name}`)
            } else {
                get(ref(db, `rooms/${user.name}-${session.user.name}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());
                        setRoom(`${user.name}-${session.user.name}`)
                    } else {
                        set(ref(db, `rooms/${session.user.name}-${user.name}`), {
                            "participants": [
                                session.user.name,
                                user.name
                            ],
                            "msg": {}
                        })
                        setRoom(`${session.user.name}-${user.name}`)
                        console.log(snapshot.val());
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="my-10">
            <div className="bg-white relative shadow rounded-lg text-black p-4">
                <div className={"flex justify-start"}>
                    <img
                        className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 "
                        src={user.image} alt="Profile picture"/>
                </div>
                <div className="px-6 pt-12">
                    <div className={"flex justify-between"}>
                        <div className="font-bold text-3xl mb-2">{user.name}</div>
                        {
                            (isAdmin || isMine) &&
                            <Button
                                className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                                onClick={handleShow}>Modifier</Button>
                        }
                    </div>
                    <ModifyProfileForm handleClose={handleClose} show={show} info={user} handleUpdate={handleUpdate}/>
                    <div className={"text-lg mb-2"}>{user.jobTitle}</div>
                    <p className="text-gray-700 text-base mb-4">
                        {user.description}
                    </p>
                    {!isMine &&

                            <a
                                className={'inline-flex py-2 px-4 items-center bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                                onClick={loadRoom}
                                href={`/messaging?room=${room}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-6 h-6 mr-2">
                                    <path fillRule="evenodd"
                                          d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                                          clipRule="evenodd"/>
                                </svg>
                                Me contacter
                            </a>
                    }
                </div>
            </div>
        </div>
    )
}

export default DeveloperProfile