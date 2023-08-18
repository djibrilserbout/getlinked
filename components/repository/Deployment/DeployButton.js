import {useSession} from "next-auth/react";


const DeployButton = ({token, repoName, selectedBranch, setMessage}) => {
    const {data: session} = useSession();

    const deploy = async () => {
        const url = "https://api.github.com/repos";
        const parameters = {
            method: 'POST',
            headers: {authorization: "token " + token},
            body: JSON.stringify({"source": {"branch": selectedBranch, "path": "/"}})
        }

        const response = await fetch(url + "/" + session.user.name + "/" + repoName + "/pages", parameters)
        if (response.ok) {
            const json = await response.json();
            console.log(json);
            setMessage([response.status, json.message]);
        }
    }
    return (
        <button className="btn btn-primary"
                onClick={() => deploy()}>Deployer</button>
    )
}
export default DeployButton