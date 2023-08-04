import {Button, Form, Modal} from "react-bootstrap";

const AddEducationForm = ({show, handleClose, userId, handleUpdate}) => {
    async function handleSubmit(e) {
        e.preventDefault()

        const parameters = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target.formBasicDiploma.value,
                schoolName: e.target.formBasicSchool.value,
                description: e.target.formBasicDescription.value,
                dateBegin: e.target.formBasicDateBegin.value ? new Date(e.target.formBasicDateBegin.value).toISOString() : null ,
                dateFinish: e.target.formBasicDateFinish.value ? new Date(e.target.formBasicDateFinish.value).toISOString() : null,
            })
        }
        const response = await fetch(`/api/users/${userId}/educations`, parameters)

        if(response.ok) {
            console.log(await response.json())
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter une formation</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicSchool">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <Form.Label>Nom de l'organisme formateur</Form.Label>
                        <Form.Control type="text" placeholder="ex: ETNA"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDiploma">
                        <Form.Label>Diplôme</Form.Label>
                        <Form.Control type="text" placeholder="Ex: License"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDateBegin">
                        <Form.Label>Date de début</Form.Label>
                        <Form.Control type="date" placeholder="Date de début de la formation"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDateFinish">
                        <Form.Label>Date de fin</Form.Label>
                        <Form.Control type="date" placeholder="Date de fin de la formation"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description de la formation</Form.Label>
                        <Form.Control as="textarea" placeholder="Décrivez votre expérience"/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleUpdate}>
                        Enregister
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddEducationForm