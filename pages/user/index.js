import {useEffect, useState} from "react";

import ProfileCard from "../../components/user/profile/ProfileCard";
import Head from "next/head";

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
            <Head>
                <title>getLinked | Profils développeurs</title>
            </Head>
            <h1 className={"invisible"}>Liste des développeurs disponibles</h1>
            <div className={"grid md:grid-cols-3 sm:grid-cols-1"}>
                {users.map((user) => <ProfileCard key={user.id} user={user}/>)}
            </div>
        </>
    );
}

export default Index