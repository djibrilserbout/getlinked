import {Router, useRouter} from 'next/router'
import {useEffect, useState} from "react";
import {PrismaClient} from "@prisma/client";
import {getSession, useSession} from "next-auth/react";
import RepositoryDeployment from "../../components/repository/Deployment/RepositoryDeployment";
import RepositoryPlaceholder from "../../components/placeholders/RepositoryPlaceholder";
import RepositoryPresentation from "../../components/repository/RepositoryPresentation";
import Head from "next/head";

const prisma = new PrismaClient();

export async function getServerSideProps({req}) {
    const session = await getSession({req});
    if (!session)
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
    return {
        props: {
            token: token.access_token
        }
    }
}

const Repository = (props) => {
    const router = useRouter()
    const {repository} = router.query
    const {data: session, status} = useSession();

    const [isNotFound, setIsNotFound] = useState(false);
    const [repoInfos, setRepoInfos] = useState();
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [deploymentInfos, setDeploymentInfos] = useState();


    const getDeploymentInfos = async (repoName) => {
        if (repoInfos?.has_pages) {
            const url = `https://api.github.com/repos/${session.user.name}/${repoName}/pages`
            const parameters = {
                method: 'GET', headers: {authorization: `token ${props.token}`},
            }
            const response = await fetch(url, parameters);
            if (response.ok) {
                setDeploymentInfos(await response.json());
            }
        }
    }

    const getBranches = async (repoName) => {
        try {
            const url = "https://api.github.com/repos";
            const parameters = {
                method: 'GET', headers: {authorization: "Bearer " + props.token},
            }

            const response = await fetch(url + "/" + session.user.name + "/" + repoName + "/branches", parameters)
            const json = await response.json();
            setBranches(json);
        } catch (error) {
            console.error(error);
        }
    }


    const getRepoInfos = async () => {
        const url = "https://api.github.com/repos";
        const parameters = {
            method: 'GET', headers: {authorization: "token " + props.token},
        }

        const response = await fetch(url + "/" + session.user.name + "/" + repository, parameters);

        if (response.status === 404)
            setIsNotFound(true)

        const json = await response.json();

        if (response.ok) {
            setRepoInfos(json);
            getBranches(json.name);
            getDeploymentInfos(json.name);
        }

    }
    useEffect(() => {
        status === "authenticated" && getRepoInfos();
    }, [status])

    if (status === "loading")
        return <RepositoryPlaceholder/>
    return (
        isNotFound ? <>Not Found</> :
            <>
                {repoInfos && <RepositoryPresentation name={repoInfos.name} description={repoInfos.description} />}
                <div>
                    <Head>
                        <title>getLinked | {repoInfos?.name}</title>
                    </Head>
                    {repoInfos?.has_pages ? <div>Déployé</div> : <div>Non déployé</div>}
                    {deploymentInfos && <span>Disponible vers : {deploymentInfos.html_url} </span>}
                </div>
                <div>Branches :
                    <select id="branches" value={selectedBranch}
                            onChange={(event) => setSelectedBranch(event.target.value)}>
                        <option value="">--Choissisez une branche---</option>
                        {branches.length ? branches?.map((branch, index) =>
                            <option key={index} value={branch.name}>{branch.name}</option>) : "lkl"}
                    </select>
                </div>

                <RepositoryDeployment repoInfos={repoInfos} selectedBranch={selectedBranch} token={props.token}/>

            </>
    )
}


export default Repository