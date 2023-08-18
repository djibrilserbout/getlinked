import {Button, Form, Modal} from "react-bootstrap";

const AddStepForm = ({show, challengeId, handleClose, handleUpdate}) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const parameters = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target.formStepName.value,
                description : e.target.formStepDescription.value
            })
        }
        const response = await fetch(`/api/challenges/${challengeId}/steps`, parameters)

        if (response.ok) {
            console.log(await response.json())
        }
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter une étape</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formStepName">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <Form.Label>Nom de l'étape</Form.Label>
                        <Form.Control type="text" placeholder="ex: Créer une architecture HTML"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formStepDescription">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <Form.Label>Description de l'étape</Form.Label>
                        <Form.Control as="textarea" placeholder="ex: Commencer par comprendre comment fonctionne HTML"/>
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

export default AddStepForm