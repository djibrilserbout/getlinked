import {useEffect, useState} from "react";
import ExperienceCard from "./ExperienceCard";
import AddExperienceForm from "./AddExperienceForm";
import {Button} from "react-bootstrap";

const ExperienceGroup = ({userId, isAdmin, isMine}) => {
    const [experiences, setExperiences] = useState([])
    const [show, setShow] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdate = () => {
        handleClose()
        setIsUpdated(true);
    }

    const getExperiences = async () => {
        const url = `/api/users/${userId}/experiences`
        const parameters = {
            method: "GET"
        }
        const response = await fetch(url, parameters);
        console.log(response);
        if (response.ok) {
            let json = await response.json()
            setExperiences(json);
        }
    }
    useEffect(() => {
        getExperiences()
        setIsUpdated(false)
    }, [isUpdated])

    return (
        <div>
            {
                (isAdmin || isMine) &&
                <div className={"admin-buttons"}>
                    <Button size={"sm"} variant="primary" type="submit" onClick={handleShow}>Ajouter</Button>
                </div>
            }
            <h2>Expérience</h2>
            <AddExperienceForm handleClose={handleClose} handleUpdate={handleUpdate} show={show} userId={userId}/>
            <div className={"resume-group experience-group"}>
            {
                experiences.map(experience =>
                    <ExperienceCard key={experience.id}
                                    experience={experience}
                                    handleUpdate={handleUpdate}
                                    isAdmin={isAdmin}
                                    isMine={isMine}/>
                )
            }
            </div>
        </div>
    )
}

export default ExperienceGroup