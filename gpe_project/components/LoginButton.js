import {useSession, signIn, signOut } from "next-auth/react"
import {getSession} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "react-bootstrap";

const LoginButton = () => {
    const {data: session, status} = useSession();
    if (session) {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Image  className={"profile-picture"}
                        src={session.user.image}
                        width="40"
                        height="40"
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