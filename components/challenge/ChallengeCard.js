import {Button, Card} from "react-bootstrap";
import ModifyChallengeForm from "./ModifyChallengeForm";
import {useState} from "react";
import Link from "next/link";

const ChallengeCard = ({challenge, handleShow, handleUpdate, isAdmin}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShowForm = () => setShow(true);
    const handleUpdateCard = () => {
        handleClose();
        handleUpdate();
    }

    async function deleteChallenge() {
        const parameters = {
            'method': 'DELETE',
        }
        const response = await fetch(`/api/challenges/${challenge.id}`, parameters);
        if (response.ok) {
            console.log(await response.json())
        }
        handleUpdate();
    }

    return (
        <div className={"my-5"}>
            <div className={"flex justify-between"}>
                <div className={"text-xl font-bold"}>{challenge.name}</div>
                {
                    isAdmin && <div className={"space-x-2"}>
                        <Button
                            className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                            onClick={handleShowForm}>Modifier</Button>
                        <Button
                            className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                            onClick={deleteChallenge}>Supprimer</Button>
                    </div>
                }
            </div>

            <Card.Text>{challenge.description}</Card.Text>
            <div className="my-5">
                <button onClick={() => handleShow(challenge.id)}
                        className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">
                    Voir le challenge
                </button>
            </div>
            <ModifyChallengeForm show={show}
                                 handleClose={handleClose}
                                 challenge={challenge}
                                 handleUpdate={handleUpdateCard}/>
        </div>
    )
}

export default ChallengeCard