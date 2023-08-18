import ModifyExperienceForm from "./ModifyExperienceForm";
import {useState} from "react";
import {Button, Card} from "react-bootstrap";
import ModifyEducationForm from "../education/ModifyEducationForm";

const ExperienceCard = ({experience, handleUpdate, isAdmin, isMine}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdateCard = () => {
        handleClose()
        handleUpdate();
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
    }

    experience.dateBegin = formatDate(experience.dateBegin);
    experience.dateFinish = formatDate(experience.dateFinish);

    async function deleteExperience() {
        const parameters = {
            'method': 'DELETE',
        }
        const response = await fetch(`/api/users/${experience.userId}/experiences/${experience.id}`, parameters);
        if (response.ok) {
            console.log(await response.json())
        }
        handleUpdate();
    }

    return (
        <Card style={{marginTop: '10px', marginBottom: '10px'}}>
            <Card.Body>
                {
                    (isAdmin || isMine) &&
                    <div className={"admin-buttons"}>
                        <Button variant="warning" size={"sm"} onClick={handleShow}>Modifier</Button>
                        <Button variant="danger" size={"sm"} onClick={deleteExperience}>Supprimer</Button>
                    </div>
                }
                <h4>{experience.companyName}</h4>
                <Card.Title>{experience.name}</Card.Title>
                <Card.Text>{experience.description}</Card.Text>
            </Card.Body>
            <Card.Footer className={"text-muted"}>
                {experience.dateBegin} - {experience.dateFinish}
            </Card.Footer>

            <ModifyExperienceForm handleClose={handleClose}
                                  show={show}
                                  experience={experience}
                                  handleUpdate={handleUpdateCard}/>
        </Card>
    )
}

export default ExperienceCard