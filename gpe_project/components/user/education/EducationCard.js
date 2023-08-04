import ModifyEducationForm from "./ModifyEducationForm";
import {useState} from "react";
import {Button, Card} from "react-bootstrap";

const EducationCard = ({education, handleUpdate, isAdmin, isMine}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdateCard = () => {
        handleClose();
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

    education.dateBegin = formatDate(education.dateBegin);
    education.dateFinish = formatDate(education.dateFinish);

    async function deleteEducation() {
        const parameters = {
            'method': 'DELETE',
        }
        const response = await fetch(`/api/users/${education.userId}/educations/${education.id}`, parameters);
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
                        <Button variant="danger" size={"sm"} onClick={deleteEducation}>Supprimer</Button>
                    </div>
                }
                <h4>{education.schoolName}</h4>
                <Card.Title>{education.name}</Card.Title>
                <Card.Text>{education.description}</Card.Text>
            </Card.Body>
            <Card.Footer className={"text-muted"}>
                {education.dateBegin} - {education.dateFinish}
            </Card.Footer>
            <ModifyEducationForm show={show}
                                 handleClose={handleClose}
                                 handleUpdate={handleUpdateCard}
                                 education={education}/>
        </Card>
    )
}

export default EducationCard