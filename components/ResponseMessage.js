const ResponseMessage = ({message}) => {
    if (message[0] >= 400) {
        return (
            <div
                className={"alert alert-dismissible fade show text-red-500 "}
                role="alert">
                KO
            </div>
        )
    }
    return (
        <div
            className={"alert alert-dismissible fade show text-green-500 "}
            role="alert">
            OK
        </div>
    )

}

export default ResponseMessage