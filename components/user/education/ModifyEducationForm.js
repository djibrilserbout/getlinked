import {Button, Form, Modal} from "react-bootstrap";
import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";

const ModifyEducationForm = ({show, handleClose, handleUpdate, education}) => {
    async function handleSubmit(e) {
        e.preventDefault()

        const parameters = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target.formBasicDiploma.value,
                schoolName: e.target.formBasicSchool.value,
                description: e.target.formBasicDescription.value,
                dateBegin: e.target.formBasicDateBegin.value ? new Date(e.target.formBasicDateBegin.value).toISOString() : null ,
                dateFinish: e.target.formBasicDateFinish.value ? new Date(e.target.formBasicDateFinish.value).toISOString() : null,
            })
        }
        const response = await fetch(`/api/users/${education.userId}/educations/${education.id}`, parameters)

        if(response.ok) {
            console.log(await response.json())
            handleUpdate();
        }
    }
    return (
        /*<Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modifier une formation</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicSchool">
                        <Form.Label>Nom de l'organisme formateur</Form.Label>
                        <Form.Control type="text" placeholder="ex: ETNA" defaultValue={education.schoolName}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDiploma">
                        <Form.Label>Diplôme</Form.Label>
                        <Form.Control type="text" placeholder="Ex: License" defaultValue={education.name}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDateBegin">
                        <Form.Label>Date de début</Form.Label>
                        <Form.Control type="date" placeholder="Date de début de la formation" defaultValue={education.dateBegin}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDateFinish">
                        <Form.Label>Date de fin</Form.Label>
                        <Form.Control type="date" placeholder="Date de fin de la formation" defaultValue={education.dateFinish}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description de la formation</Form.Label>
                        <Form.Control as="textarea" placeholder="Décrivez votre expérience" defaultValue={education.description}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleUpdate}>
                        Enregister
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>*/
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Modifier une formation
                                </Dialog.Title>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="formBasicSchool">
                                            Nom de l&apos;organisme formateur
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="formBasicSchool" defaultValue={education.schoolName} id="schoolname" type="text" placeholder="ex: ETNA"/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="formBasicDiploma">
                                            Nom de l&apos;organisme formateur
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="formBasicDiploma" defaultValue={education.name} id="diploma" type="text" placeholder="ex: BTS SIO"/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="formBasicDateBegin">
                                            Date de début de la formation
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="formBasicDateBegin" defaultValue={education.dateBegin} id="datebeginschool" type="date" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="formBasicDateFinish">
                                            Date de fin de la formation
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="formBasicDateFinish" defaultValue={education.dateFinish} id="datefinishschool" type="date" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="formBasicDescription">
                                            Description de votre experience de la formation
                                        </label>
                                        <textarea
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="formBasicDescription" defaultValue={education.description} id="description" placeholder="ex: J'ai pu apprendre de nouvelles choses sur..."/>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleUpdate}
                                        >
                                            Enregistrer
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default ModifyEducationForm