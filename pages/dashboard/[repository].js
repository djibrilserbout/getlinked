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
    }, [status, repoInfos])

    if (status === "loading")
        return <RepositoryPlaceholder/>
    return (
        isNotFound ? <>Not Found</> :
            <>
                <Head>
                    <title>getLinked | {repoInfos?.name}</title>
                </Head>
                <div className={"bg-black border-b-2 rounded-tr-lg p-10 flex justify-between"}>
                    <div>
                        {repoInfos &&
                            <RepositoryPresentation name={repoInfos.name} description={repoInfos.description}/>}
                        {repoInfos?.has_pages ? <div className={"font-bold text-green-400"}>Déployé sur internet</div> :
                            <div>Non déployé</div>}
                    </div>
                    {deploymentInfos &&
                        <a className={"bg-white rounded-lg font-bold text-black p-5 border-solid border-2 hover:border-white hover:bg-transparent hover:text-white "}
                           href={deploymentInfos.html_url}>Visiter le site</a>}
                </div>
                <div className={" bg-black p-10"}>
                    <div>Branche choisie  :
                        <select className={"ml-4 text-black"} value={selectedBranch}
                                onChange={(event) => setSelectedBranch(event.target.value)}>
                            <option value="">--Choissisez une branche---</option>
                            {branches.length ? branches?.map((branch, index) =>
                                <option key={index} value={branch.name}>{branch.name}</option>) : "lkl"}
                        </select>
                    </div>
                    <RepositoryDeployment repoInfos={repoInfos} selectedBranch={selectedBranch} token={props.token}/>
                    <div className="h-10 md:h-40"></div>
                </div>
            </>
    )
}


export default Repository