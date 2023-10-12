import {Button, Card, CloseButton, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import StepCard from "./StepCard";
import AddStepForm from "./AddStepForm";

const StepGroup = ({challengeId, challenge, show, handleClose, isAdmin, isRecruiter}) => {
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
        <div  className={"bg-white text-black p-5 rounded-lg "} style={{ display: show ? 'block' : 'none'}}>
            <div className={"flex justify-between"}>
                <div className={"text-2xl font-bold"}>{challenge.name}</div>
                {(isAdmin || isRecruiter) && <Button className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'} onClick={handleShowForm}>Ajouter une étape</Button>}
                <CloseButton onClick={handleClose}/>
            </div>
                <div className="container mx-auto my-20">
                    {
                        steps.map(step =>
                            <StepCard key={step.id}
                                      step={step}
                                      handleUpdate={handleUpdate}
                                      isAdmin={isAdmin}
                                      isRecruiter={isRecruiter}/>
                        )
                    }
                </div>
            <AddStepForm challengeId={challengeId}
                         show={showForm}
                         handleClose={handleCloseForm}
                         handleUpdate={handleUpdate}/>
        </div>
    );
}

export default StepGroup