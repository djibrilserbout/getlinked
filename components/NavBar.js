import {useSession} from "next-auth/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import {Container, Nav, Navbar} from "react-bootstrap";

const NavBar = () => {

    return (
        <Navbar variant={"dark"} bg={"dark"}>
            <Container>
                <Navbar.Brand href="/">getLinked</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/dashboard">Tableau de bord</Nav.Link>
                    <Nav.Link href="/user/">Profils développeurs</Nav.Link>
                    <Nav.Link href="/challenges/">Challenges</Nav.Link>
                </Nav>
                <Nav>
                    <LoginButton/>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;