import {useEffect, useState} from "react";
import ProjectCard from "./ProjectCard";
import AddProjectForm from "./AddProjectForm";
import {Button} from "react-bootstrap";

const ProjectGroup = ({userId, isAdmin, isMine}) => {
    const [projects, setProjects] = useState([])
    const [show, setShow] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdate = () => {
        handleClose()
        setIsUpdated(true);
    }

    const getProjects = async () => {
        const url = `/api/users/${userId}/projects`
        const parameters = {
            method: "GET"
        }
        const response = await fetch(url, parameters);
        console.log(response);
        if (response.ok) {
            let json = await response.json()
            setProjects(json);
        }
    }
    useEffect(() => {
        getProjects()
        setIsUpdated(false)
    }, [isUpdated])

    return (
        <div className={"p-4"}>
            <div className={"flex justify-between"}>
                <h2 className={"text-2xl font-bold"}>Projets</h2>
                {
                    (isAdmin || isMine) &&
                    <button className={'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                            onClick={handleShow}>Ajouter</button>
                }
            </div>
            <AddProjectForm handleClose={handleClose} handleUpdate={handleUpdate} show={show} userId={userId}/>
            <div className={"divide-y divide-solid divide-grey-700"}>
                {
                    projects.map(project =>
                        <ProjectCard key={project.id}
                                        project={project}
                                        handleUpdate={handleUpdate}
                                        isAdmin={isAdmin}
                                        isMine={isMine}/>
                    )
                }
            </div>
        </div>

    )
}

export default ProjectGroup