import {Button, Form, Modal} from "react-bootstrap";

const ModifyProfileForm = ({show, handleClose, handleUpdate, info}) => {
    async function handleSubmit(e) {
        e.preventDefault()

        const parameters = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jobTitle: e.target.formBasicJobTitle.value,
                description: e.target.formBasicDescription.value,
            })
        }
        const response = await fetch(`/api/users/${info.id}`, parameters)

        if(response.ok) {
            console.log(await response.json())
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modifier votre profil</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" defaultValue={info.name} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" defaultValue={info.email} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicJobTitle">
                        <Form.Label>Intitulé du poste</Form.Label>
                        <Form.Control type="text" placeholder="Ex: Développeur web" defaultValue={info.jobTitle}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Ex: Développeur web" defaultValue={info.description}/>
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

export default ModifyProfileForm