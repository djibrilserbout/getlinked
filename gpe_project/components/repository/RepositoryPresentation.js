const RepositoryPresentation = ({name, description}) => {
    return (
        <div className={"repository-presentation"}>
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    )
}

export default RepositoryPresentation