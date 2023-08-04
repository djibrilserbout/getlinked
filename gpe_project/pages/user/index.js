import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {Button, Card, CardGroup, CardImg} from "react-bootstrap";
import ProfileCard from "../../components/user/profile/ProfileCard";

const Index = () => {
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const url = '/api/users'
        const parameters = {
            method: "GET"
        }
        const response = await fetch(url, parameters);
        console.log(response);
        if (response.ok) {
            setUsers(await response.json());

        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <>
        <h1>Les développeurs</h1>
        <div style={{display: 'flex'}}>
            {users.map((user) => <ProfileCard key={user.id} user={user}/>)}
        </div>
</>
)
    ;
}

export default Index