import ModifyEducationForm from "./ModifyEducationForm";
import {useState} from "react";
import {Button, Card} from "react-bootstrap";

const EducationCard = ({education, handleUpdate, isAdmin, isMine}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdateCard = () => {
        handleClose();
        handleUpdate();
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
    }

    education.dateBegin = formatDate(education.dateBegin);
    education.dateFinish = formatDate(education.dateFinish);

    async function deleteEducation() {
        const parameters = {
            'method': 'DELETE',
        }
        const response = await fetch(`/api/users/${education.userId}/educations/${education.id}`, parameters);
        if (response.ok) {
            console.log(await response.json())
        }
        handleUpdate();
    }

    return (
        <div>
            <div className={"my-5"}>
                <div className={"flex justify-between"}>
                    <div className={"text-xl font-bold"}>{education.name}</div>
                    {
                        (isAdmin || isMine) &&
                        <div className={"space-x-2"}>
                            <button className={"bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={handleShow}>Modifier</button>
                            <button className={"bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={deleteEducation}>Supprimer</button>
                        </div>

                    }
                </div>
                <h4>{education.schoolName}</h4>
                <div className={"text-gray-600"}>
                    {education.dateBegin} - {education.dateFinish}
                </div>
                <div>{education.description}</div>
            </div>
            <ModifyEducationForm show={show}
                                 handleClose={handleClose}
                                 handleUpdate={handleUpdateCard}
                                 education={education}/>
        </div>
    )
}

export default EducationCard