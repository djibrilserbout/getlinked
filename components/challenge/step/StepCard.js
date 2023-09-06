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
        <Card key={step.id}>
            <div className={"flex justify-between mt-4"}>
                <div className={"text-xl font-bold"}>{step.name}</div>
                {
                    isAdmin && <div className={"space-x-2"}>
                        <Button className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'} onClick={handleShowForm}>Modifier</Button>
                        <Button className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'} onClick={deleteStep}>Supprimer</Button>
                    </div>
                }
            </div>
                <div>{step.description}</div>

            <ModifyStepForm show={showForm}
                            step={step}
                            handleClose={handleCloseForm}
                            handleUpdate={handleUpdateForm}/>
        </Card>
    )
}

export default StepCard