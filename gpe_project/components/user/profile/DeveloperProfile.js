import Image from "next/image";

const DeveloperProfile = ({user}) => {
    return (
        <div>
            <Image src={user.image}
                   width={100}
                   height={100} alt={"User profile picture"}/>
            <h1>{user.name}</h1>
            <h2>{user.jobTitle}</h2>
            <p>{user.description}</p>
        </div>
    )
}

export default DeveloperProfile