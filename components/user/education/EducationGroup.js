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
        <div>

            {(isAdmin || isMine) &&
                <div className={"admin-buttons"}>
                    <Button variant="primary" size={"sm"} onClick={handleShow}>
                        Ajouter
                    </Button>
                </div>}
            <h2>Formation</h2>
            <AddEducationForm show={show}
                              handleClose={handleClose}
                              userId={userId}
                              handleUpdate={handleUpdate}/>
            <div className={"resume-group education-group"}>
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