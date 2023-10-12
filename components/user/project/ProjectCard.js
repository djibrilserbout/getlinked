import ModifyProjectForm from "./ModifyProjectForm";
import {useState} from "react";
import {Button, Card} from "react-bootstrap";

const ProjectCard = ({project, handleUpdate, isAdmin, isMine}) => {
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

    project.dateBegin = formatDate(project.dateBegin);
    project.dateFinish = formatDate(project.dateFinish);

    async function deleteProject() {
        const parameters = {
            'method': 'DELETE',
        }
        const response = await fetch(`/api/users/${project.userId}/projects/${project.id}`, parameters);
        if (response.ok) {
            console.log(await response.json())
        }
        handleUpdate();
    }

    return (
        <div>
            <div className={"my-5"}>
                <div className={"flex justify-between"}>
                    <div className={"text-xl font-bold"}>{project.name}</div>
                    {
                        (isAdmin || isMine) &&
                        <div className={"space-x-2"}>
                            <button onClick={handleShow}
                                    className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}>
                                Modifier
                            </button>
                            <button onClick={deleteProject}
                                    className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}>
                                Supprimer
                            </button>

                        </div>
                    }
                </div>
                <div className={"text-lg font-semibold"}>Challenge : {project.challengeName}</div>
                <h4 className={"text-lg"}>{project.companyName}</h4>
                <a href={project.link} className={"text-lg text-decoration-underline  hover:text-decoration-no-underline"}>Lien vers le projet</a>
                <div className={"text-gray-600"}>
                    {project.dateBegin} - {project.dateFinish}
                </div>
                <div>{project.description}</div>
            </div>


            <ModifyProjectForm handleClose={handleClose}
                                  show={show}
                                  project={project}
                                  handleUpdate={handleUpdateCard}/>
        </div>
    )
}

export default ProjectCard