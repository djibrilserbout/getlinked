import {Button, Form, Modal} from "react-bootstrap";

const addChallengeForm = ({ show, handleClose, handleUpdate }) => {
    async function handleSubmit(e) {
        e.preventDefault();

        const parameters = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target.formChallengeName.value,
            })
        }
        const response = await fetch(`/api/challenges`, parameters)

        if(response.ok) {
            console.log(await response.json())
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter un challenge</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formChallengeName">
                        <Form.Label>Nom du challenge</Form.Label>
                        <Form.Control type="text" placeholder="ex: Faire une calculatrice en JS"/>
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

export default addChallengeForm