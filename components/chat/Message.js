const Message = ({msg}) => {
    return(
        <div className={"bubble"}>
            <div className={"author"}>{msg[1].username}</div>
            <span>{msg[1].msg}</span>
            <div className={"sent"}>Envoyé à : {new Date(msg[1].createdAt).toLocaleString()}</div>
        </div>
    )
}
export default Message;