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
        <button className="shadow-xl font-bold bg-blue-900 text-sm text-white p-2 rounded-lg"
                onClick={() => deploy()}>Deployer sur internet</button>
    )
}
export default DeployButton