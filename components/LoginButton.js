import {useSession, signIn, signOut } from "next-auth/react"
import {getSession} from "next-auth/react";
import Image from "next/image";

const LoginButton = () => {
    const {data: session, status} = useSession();
    if (session) {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Image  className={"h-8 w-8 rounded-full"}
                        src={session.user.image}
                        width="35"
                        height="35"
                        alt="User profile picture"/>
                <span style={{color: "white"}}>{session.user.name}</span>
                <button className="btn btn-warning" onClick={() => signOut()}>Se déconnecter</button>
            </div>
        )
    }
    return (
        <>
            <button className="btn btn-primary" onClick={() => signIn('github')}>Se connecter</button>
        </>)
}

export default LoginButton