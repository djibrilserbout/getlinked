import {useEffect, useState} from "react";
import {getSession, useSession} from "next-auth/react";
import RepositoryPreview from "../../components/repository/RepositoryPreview";
import {PrismaClient} from "@prisma/client";
import {CardGroup, Row} from "react-bootstrap";
import Head from "next/head";

const prisma = new PrismaClient();

export async function getServerSideProps({req}) {
    const session = await getSession({req});
    if(!session)
        return {
            redirect: {
                permanent: false,
                destination: `/`
            }
        }
    const email = session.user.email;
    const user = await prisma.user.findUnique({
        where: {email: email},
        select: {id: true},
    });
    const token = await prisma.account.findFirst({
        where: {userId: user.id},
        select: {access_token: true},
    });
    console.log(token.access_token);
    return {
        props: {
            name: session.user.name,
            token: token.access_token
        }
    }
}

export default function Index({token, name}) {
    const {data: session, status} = useSession();
    const [repositories, setRepositories] = useState([]);
    const getRepos = async () => {
        const url = "https://api.github.com/user/repos"
        const parameters = {
            method: 'GET',
            headers: {authorization: "Bearer " + token},
        }
        const response = await fetch(url, parameters);
        if (response.ok)
            setRepositories(await response.json()) ;
    }

    useEffect(() => {
        getRepos()
    }, [status]);

    console.log({repositories});
    if(repositories.length === 0) {
        return (
            <>Loading...</>
        )
    }
    return (
        <div>
            <Head>
                <title>getLinked | Tableau de bord</title>
            </Head>
            <h1 className={"invisible"}>Tableau de bord</h1>
            <div className={"grid md:grid-cols-4 sm:grid-cols-1"}>
                {
                    repositories.map(repo => <RepositoryPreview key={repo.name} repo={repo} />)
                }
            </div>
            <div className="h-10 md:h-40"></div>
        </div>
    );
}
