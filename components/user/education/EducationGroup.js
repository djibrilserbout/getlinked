import EducationCard from "./EducationCard";
import {useEffect, useState} from "react";
import AddEducationForm from "./AddEducationForm";
import {Button} from "react-bootstrap";

const EducationGroup = ({userId, isAdmin, isMine}) => {
    const [educations, setEducations] = useState([])
    const [show, setShow] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdate = () => {
        handleClose();
        setIsUpdated(true);
    }

    const getEducations = async () => {
        const url = `/api/users/${userId}/educations`
        const parameters = {
            method: "GET"
        }
        const response = await fetch(url, parameters);
        console.log(response);
        if (response.ok) {
            let json = await response.json()
            setEducations(json);
        }
    }

    useEffect(() => {
        getEducations()
        setIsUpdated(false);
    }, [isUpdated])

    return (
        <div className={"p-4"}>
            <div className={"flex justify-between"}>
                <h2 className={"text-2xl font-bold"}>Formation</h2>
                {(isAdmin || isMine) &&
                    <button className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                       onClick={handleShow}>Ajouter</button>
                }
            </div>
            <AddEducationForm show={show}
                              handleClose={handleClose}
                              userId={userId}
                              handleUpdate={handleUpdate}/>
            <div className={"divide-y divide-solid divide-grey-700"}>
            {
                    educations.map(education =>
                        <EducationCard key={education.id}
                                       education={education}
                                       handleUpdate={handleUpdate}
                                       isAdmin={isAdmin}
                                       isMine={isMine}/>
                    )
                }
            </div>

        </div>
    )
}

export default EducationGroup