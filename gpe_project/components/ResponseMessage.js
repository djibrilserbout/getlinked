const ResponseMessage = ({message}) => {
    return (
        <div
            className={"alert alert-dismissible fade show" + (message[0] >= 400 ? " alert-danger " : " alert-success")}
            role="alert">
            {message[0]} - {message[1]}
        </div>
    )
}

export default ResponseMessage