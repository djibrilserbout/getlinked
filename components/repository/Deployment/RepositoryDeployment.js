import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import ResponseMessage from "../../ResponseMessage";
import DeployButton from "./DeployButton";
import UndeployButton from "./UndeployButton";

const RepositoryDeployment = ({repoInfos, selectedBranch, token}) => {
    const {data: session, status} = useSession()
    const [message, setMessage] = useState();

    if (!repoInfos) {
        return <>Loading...</>
    }
    return (
        <div className={"mt-4"}>
            {!repoInfos.has_pages ?
                <DeployButton token={token}
                              selectedBranch={selectedBranch}
                              repoName={repoInfos.name}
                              setMessage={setMessage}/> :
                <UndeployButton token={token}
                                repoName={repoInfos.name}
                                setMessage={setMessage}/>
            }
            {message && <ResponseMessage message={message}/>}
        </div>
    )
}

export default RepositoryDeployment