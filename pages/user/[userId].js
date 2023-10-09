import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import EducationGroup from "../../components/user/education/EducationGroup";
import ExperienceGroup from "../../components/user/experience/ExperienceGroup";
import DeveloperProfile from "../../components/user/profile/DeveloperProfile";
import authorization from "../../lib/authorization";
import {Button} from "react-bootstrap";

import Head from "next/head";
import ProjectGroup from "../../components/user/project/ProjectGroup";

const UserProfile = ({isSuperAdmin, isAdmin, isMine}) => {
    const router = useRouter()
    const {userId} = router.query
    const {data: session} = useSession()
    const [user, setUser] = useState([])
    const [show, setShow] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdate = () => {
        handleClose();
        setIsUpdated(true);
    }
    const grantPermissions = async () => {
        const url = `/api/users/${userId}/role`
        const parameters = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'grant'
            })
        }
        const response = await fetch(url, parameters);
        console.log(response);
        if (response.ok) {
            let json = await response.json()
            console.log(json);
        }
    }
    const revokePermissions = async () => {
        const url = `/api/users/${userId}/role`
        const parameters = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'revoke'
            })
        }
        const response = await fetch(url, parameters);
        console.log(response);
        if (response.ok) {
            let json = await response.json()
            console.log(json);
        }
    }


    const getUser = async () => {
        const url = `/api/users/${userId}`
        const parameters = {
            method: "GET"
        }
        const response = await fetch(url, parameters);
        console.log(response);
        if (response.ok) {
            let json = await response.json()
            setUser(json);
        }
    }

    useEffect(() => {
        setIsUpdated(false);
        if (router.isReady) {
            getUser()
        }
    }, [router.isReady, isUpdated])


    if (user.length === 0 ||
        !session) {
        return <>Loading...</>
    }
    return (
        <div className={"mt-20"}>
            <Head>
                <title>getLinked | {user.name}</title>
            </Head>
            {
                (isSuperAdmin && !isMine) &&
                <div className={"space-x-2 flex justify-end"}>
                    <Button className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'} onClick={grantPermissions}>Ajouter des permissions</Button>
                    <Button className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'} onClick={revokePermissions}>Enlever des permissions</Button>
                </div>
            }
            <div>

                <DeveloperProfile user={user} show={show} isAdmin={isAdmin} isMine={isMine} handleShow={handleShow} handleClose={handleClose} handleUpdate={handleUpdate}/>
                <div className={"my-10"}>
                    <div className="bg-white relative shadow rounded-lg text-black p-4">
                        <ExperienceGroup userId={userId} isAdmin={isAdmin} isMine={isMine}/>
                        <EducationGroup userId={userId} isAdmin={isAdmin} isMine={isMine}/>
                        <ProjectGroup userId={userId} isAdmin={isAdmin} isMine={isMine}/>
                    </div>
                </div>

            </div>
            <div>
            </div>
            <div className="h-10 md:h-40"></div>
        </div>
    )
}

export async function getServerSideProps({req, query}) {
    const auth = await authorization({req, query})
    return {
        props: {
            ...auth,
        }
    }
}


export default UserProfile