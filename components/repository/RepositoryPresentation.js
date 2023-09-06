const RepositoryPresentation = ({name, description}) => {
    return (
        <>
            <h1 className={"text-3xl mb-4"}>{name}</h1>
            <p className={"mb-4"}>{description}</p>
        </>
    )
}

export default RepositoryPresentation