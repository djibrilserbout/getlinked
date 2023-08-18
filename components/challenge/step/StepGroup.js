import {Button, Card, CloseButton, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import StepCard from "./StepCard";
import AddStepForm from "./AddStepForm";

const StepGroup = ({challengeId, challenge, show, handleClose, isAdmin}) => {
    const [steps, setSteps] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const handleShowForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);
    const handleUpdate = () => {
        handleCloseForm();
        setIsUpdated(true);

    }

    const getSteps = async () => {
        const url = `/api/challenges/${challengeId}/steps`
        const parameters = {
            method: 'GET',
        }
        const response = await fetch(url, parameters);
        if (response.ok) {
            let json = await response.json();
            setSteps(json);
        }
    }
    useEffect(() => {
        getSteps();
        setIsUpdated(false)
    }, [challengeId, isUpdated])


    if (challengeId === -1)
        return <></>
    return (
        <Card style={{width: '100%', display: show ? 'block' : 'none'}}>
            <Card.Header>
                {isAdmin && <Button variant={"primary"} onClick={handleShowForm}>Ajouter une étape</Button>}
                <CloseButton onClick={handleClose}/>
            </Card.Header>
            <Card.Body>
                <Card.Title as={"h1"}>{challenge.name}</Card.Title>
                <div>
                    {
                        steps.map(step =>
                            <StepCard key={step.id}
                                      step={step}
                                      handleUpdate={handleUpdate}
                                      isAdmin={isAdmin}/>
                        )
                    }
                </div>
            </Card.Body>
            <AddStepForm challengeId={challengeId}
                         show={showForm}
                         handleClose={handleCloseForm}
                         handleUpdate={handleUpdate}/>
        </Card>
    );
}

export default StepGroup