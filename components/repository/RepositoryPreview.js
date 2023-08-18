import Link from "next/link";
import {Card, Col} from "react-bootstrap";

const RepositoryPreview = (props) => {
    return (
        <Col>
            <Link href={`/dashboard/${props.repo.name}`}>
                <Card className={"h-100"}>
                    <Card.Body>
                        <Card.Title>{props.repo.name}</Card.Title>
                        <Card.Subtitle>{props.repo.description}</Card.Subtitle>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{props.repo.visibility}</small>
                    </Card.Footer>

                </Card>
            </Link>
        </Col>
    );
}

export default RepositoryPreview;