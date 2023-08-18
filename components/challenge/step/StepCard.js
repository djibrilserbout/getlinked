import {Button, Card} from "react-bootstrap";
import ModifyStepForm from "./ModifyStepForm";
import {useState} from "react";

const StepCard = ({step, handleUpdate, isAdmin}) => {
    const [showForm, setShowForm] = useState(false)
    const handleCloseForm = () => setShowForm(false);
    const handleShowForm = () => setShowForm(true);
    const handleUpdateForm = () => {
        handleCloseForm();
        handleUpdate();
    }
    async function deleteStep() {
        const parameters = {
            'method': 'DELETE',
        }
        const response = await fetch(`/api/challenges/${step.challengeId}/steps/${step.id}`, parameters);
        if (response.ok) {
            console.log(await response.json())
        }
        handleUpdate();
    }
    return (
        <Card key={step.id} style={{margin: "20px"}} bg={"dark"} text={"light"}>
            <Card.Header>
                {
                    isAdmin && <div className={"admin-buttons"}>
                        <Button variant={"warning"} onClick={handleShowForm}>Modifier</Button>
                        <Button variant={"danger"} onClick={deleteStep}>Supprimer</Button>
                    </div>
                }
            </Card.Header>
            <Card.Body>
                <Card.Title>{step.name}</Card.Title>
                <Card.Text>{step.description}</Card.Text>
            </Card.Body>
            <ModifyStepForm show={showForm}
                            step={step}
                            handleClose={handleCloseForm}
                            handleUpdate={handleUpdateForm}/>
        </Card>
    )
}

export default StepCard