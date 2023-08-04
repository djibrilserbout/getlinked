import {Button, Card} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = ({user}) => {
    return (
        <Link href={`/user/${user.id}`}>
            <Card style={{width: '30rem', margin: '10px'}}>
                <Card.Body>
                    <Image src={user.image}
                           height={100}
                           width={100}
                           alt="User profile picture"
                           style={{borderRadius:"10px"}}/>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>{user.jobTitle}</Card.Text>
                    <Card.Text>{user.description}</Card.Text>
                </Card.Body>
                <Card.Footer><Button variant={"outline-dark"}>Voir le profil</Button></Card.Footer>
            </Card>
        </Link>
    )
}

export default ProfileCard