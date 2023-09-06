import {useSession} from "next-auth/react";

const UndeployButton = ({token, repoName, setMessage}) => {
    const removeDeployment = async () => {
        const url = `https://api.github.com/repos/${session.user.name}/${repoName}/pages`
        const parameters = {
            method: 'DELETE', headers: {authorization: `token ${token}`},
        }
        const response = await fetch(url, parameters);
        console.log(response);
        if (response.ok) {
            setMessage([response.status, 'Successfully deleted.'])
        }
    }

    const {data: session} = useSession();

    return(
        <button className="shadow-xl font-bold bg-red-900 text-sm text-white p-2 rounded-lg"
                onClick={() => removeDeployment()}>Enlever le déploiement</button>
    );
}

export default UndeployButton