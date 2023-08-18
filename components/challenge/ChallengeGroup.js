import {Button, Card} from "react-bootstrap";
import {useState} from "react";
import AddChallengeForm from "./AddChallengeForm";
import ChallengeCard from "./ChallengeCard";

const ChallengeGroup = ({challenges, handleShow, handleUpdate, isAdmin}) => {
    const [show, setShow] = useState(false);
    const handleShowForm = () => {
        setShow(true);
    }
    const handleCloseForm = () => {
        setShow(false);
    }
    const handleUpdateForm = () => {
        setShow(false);
        handleUpdate()
    }
    return (
        <div>
            {isAdmin && <Button variant={"primary"} size={"sm"} onClick={handleShowForm}>Ajouter un challenge</Button>}
            {
                challenges.map(challenge =>
                    <ChallengeCard key={challenge.id}
                                   isAdmin={isAdmin}
                                   challenge={challenge}
                                   handleShow={handleShow}
                                   handleUpdate={handleUpdateForm}/>
                )
            }
            <AddChallengeForm show={show}
                              handleClose={handleCloseForm}
                              handleUpdate={handleUpdateForm}/>
        </div>
    );
}

export default ChallengeGroup