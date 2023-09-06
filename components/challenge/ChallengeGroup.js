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
        <div className={"bg-white text-black p-5 rounded-lg w-4/5"}>
            <div className={"flex justify-between"}>
                <h1 className={"text-3xl font-bold"}>Challenges</h1>
                {isAdmin && <button
                    className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                    onClick={handleShowForm}>Ajouter</button>
                }
            </div>
            <div className="container mx-auto my-20">
                {
                    challenges.map(challenge =>
                        <ChallengeCard key={challenge.id}
                                       isAdmin={isAdmin}
                                       challenge={challenge}
                                       handleShow={handleShow}
                                       handleUpdate={handleUpdateForm}/>
                    )
                }
            </div>
            <AddChallengeForm show={show}
                              handleClose={handleCloseForm}
                              handleUpdate={handleUpdateForm}/>
        </div>
    );
}

export default ChallengeGroup