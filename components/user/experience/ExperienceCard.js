import ModifyExperienceForm from "./ModifyExperienceForm";
import {useState} from "react";
import {Button, Card} from "react-bootstrap";
import ModifyEducationForm from "../education/ModifyEducationForm";

const ExperienceCard = ({experience, handleUpdate, isAdmin, isMine}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdateCard = () => {
        handleClose()
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

    experience.dateBegin = formatDate(experience.dateBegin);
    experience.dateFinish = formatDate(experience.dateFinish);

    async function deleteExperience() {
        const parameters = {
            'method': 'DELETE',
        }
        const response = await fetch(`/api/users/${experience.userId}/experiences/${experience.id}`, parameters);
        if (response.ok) {
            console.log(await response.json())
        }
        handleUpdate();
    }

    return (
        <div>
            <div className={"my-5"}>
                <div className={"flex justify-between"}>
                    <div className={"text-xl font-bold"}>{experience.name}</div>
                    {
                        (isAdmin || isMine) &&
                        <div className={"space-x-2"}>
                            <button onClick={handleShow}
                               className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}>
                                Modifier
                            </button>
                            <button onClick={deleteExperience}
                               className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}>
                                Supprimer
                            </button>

                        </div>
                    }
                </div>
                <h4 className={"text-lg"}>{experience.companyName}</h4>
                <div className={"text-gray-600"}>
                    {experience.dateBegin} - {experience.dateFinish}
                </div>
                <div>{experience.description}</div>
            </div>


            <ModifyExperienceForm handleClose={handleClose}
                                  show={show}
                                  experience={experience}
                                  handleUpdate={handleUpdateCard}/>
        </div>
    )
}

export default ExperienceCard