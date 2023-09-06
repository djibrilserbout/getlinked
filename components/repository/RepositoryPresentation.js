const RepositoryPresentation = ({name, description}) => {
    return (
        <div>
            <h1 className={"text-5xl"}>{name}</h1>
            <p>{description}</p>
        </div>
    )
}

export default RepositoryPresentation