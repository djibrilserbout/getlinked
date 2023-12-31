import ChallengeGroup from "../../components/challenge/ChallengeGroup";
import {useEffect, useState} from "react";
import StepGroup from "../../components/challenge/step/StepGroup";
import {getSession} from "next-auth/react";
import authorization from "../../lib/authorization";
import Head from "next/head";

const Challenges = ({isAdmin, isRecruiter}) => {
    const [challenges, setChallenges] = useState([]);
    const [show, setShow] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState(-1);
    const handleShow = (childData) => {
        setSelectedChallenge(childData);
        setShow(true);
    };
    const handleClose = () => {
        setSelectedChallenge(-1);
        setShow(false);
    };
    const handleUpdate = () => {
        setShow(false);
        setIsUpdated(true);
    }

    const getChallenges = async () => {
        const url = `/api/challenges`
        const parameters = {
            method: "GET"
        }
        const response = await fetch(url, parameters);
        if (response.ok) {
            let json = await response.json();
            setChallenges(json)
        }
    }
    useEffect(() => {
        getChallenges();
        setIsUpdated(false);
    }, [isUpdated])

    function setIsOwnChallenge() {

    }
    return (
        <>
            <Head>
                <title>getLinked | Challenges</title>
            </Head>
            <div className={"container grid gap-1 md:grid-cols-2 sm:grid-cols-1"}>
                <ChallengeGroup challenges={challenges}
                                handleShow={handleShow}
                                handleUpdate={handleUpdate}
                                isAdmin={isAdmin}
                                isRecruiter={isRecruiter}
                />
                <StepGroup
                    challengeId={selectedChallenge}
                    challenge={challenges.find(challenge => challenge.id === selectedChallenge)}
                    show={show}
                    handleClose={handleClose}
                    isAdmin={isAdmin}
                    isRecruiter={isRecruiter}
                />
            </div>
            <div className="h-10 md:h-40"></div>
        </>
    )
}
export default Challenges

export async function getServerSideProps({req, query}) {
    const auth = await authorization({req, query})

    return {
        props: {
            ...auth,
        }
    }
}