import {Button, Form, Modal} from "react-bootstrap";

const ModifyExperienceForm = ({show, handleClose, handleUpdate, experience}) => {
    async function handleSubmit(e) {
        e.preventDefault()

        const parameters = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target.formBasicTitle.value,
                companyName: e.target.formBasicCompany.value,
                description: e.target.formBasicDescription.value,
                dateBegin: e.target.formBasicDateBegin.value ? new Date(e.target.formBasicDateBegin.value).toISOString() : null ,
                dateFinish: e.target.formBasicDateFinish.value ? new Date(e.target.formBasicDateFinish.value).toISOString() : null,
            })
        }
        const response = await fetch(`/api/users/${experience.userId}/experiences/${experience.id}`, parameters)

        if(response.ok) {
            console.log(await response.json())
        }
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modifier une expérience</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicCompany">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <Form.Label>Nom de l'entreprise</Form.Label>
                        <Form.Control type="text" defaultValue={experience.companyName}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Intitulé du poste</Form.Label>
                        <Form.Control type="text" placeholder="Ex: Développeur web" defaultValue={experience.name}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDateBegin">
                        <Form.Label>Date de début</Form.Label>
                        <Form.Control type="date" placeholder="Date de début" defaultValue={experience.dateBegin}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDateFinish">
                        <Form.Label>Date de fin</Form.Label>
                        <Form.Control type="date" placeholder="Date de fin" defaultValue={experience.dateFinish}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description de la formation</Form.Label>
                        <Form.Control as="textarea" placeholder="Décrivez votre expérience" defaultValue={experience.description}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleUpdate}>
                        Enregister
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ModifyExperienceForm