import {Button, Card} from "react-bootstrap";
import ModifyChallengeForm from "./ModifyChallengeForm";
import {useState} from "react";

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
        <Card style={{width: '20rem'}}>
            <Card.Header>
                {
                    isAdmin && <div className={"admin-buttons"}>
                        <Button variant={"warning"} size={"sm"} onClick={handleShowForm}>Modifier</Button>
                        <Button variant={"danger"} size={"sm"} onClick={deleteChallenge}>Supprimer</Button>
                    </div>
                }
            </Card.Header>
            <Card.Body>
                <Card.Title>{challenge.name}</Card.Title>
                <Card.Text>{challenge.description}</Card.Text>
                <Button variant={"primary"}
                        onClick={() => handleShow(challenge.id)}
                >Voir ce challenge
                </Button>
            </Card.Body>
            <ModifyChallengeForm show={show}
                                 handleClose={handleClose}
                                 challenge={challenge}
                                 handleUpdate={handleUpdateCard}/>
        </Card>
    )
}

export default ChallengeCard