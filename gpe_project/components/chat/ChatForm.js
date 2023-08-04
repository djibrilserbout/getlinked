import {Button, Form} from "react-bootstrap";
import {getDatabase, push, ref, serverTimestamp, set} from "firebase/database";
import {firebaseApp} from "../../lib/config";
import {useSession} from "next-auth/react";
import {useState} from "react";

const ChatForm = () => {
    const { data: session } = useSession()
    const [message, setMessage] = useState('');
    const handleChange = event => {
        setMessage(event.target.value);
    };
    async function handleSubmit(e) {
        e.preventDefault();

        const db = getDatabase(firebaseApp)
        const newMsg = push(ref(db))
        set(newMsg, {
            username: session.user.name,
            msg: e.target.message.value,
            createdAt: serverTimestamp()
        });
        setMessage('')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="message">
                <Form.Control type="textarea" onChange={handleChange} value={message} placeholder="Ecrire ici ..."/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Enregister
            </Button>
        </Form>
    )
}
export default ChatForm;