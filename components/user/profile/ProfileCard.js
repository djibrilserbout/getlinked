import Link from "next/link";

const ProfileCard = ({user}) => {
    return (
        <div className="container mx-auto my-20">
            <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-4/6 mx-auto text-black p-4">
                <div className={"flex justify-center"}>
                    <img
                        className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 "
                        src={user.image} alt="Sunset in the mountains"/>
                </div>
                <div className="px-6 pt-12">
                    <div className="font-bold text-xl mb-2">{user.name}</div>
                    <div className={"text-lg mb-2"}>{user.jobTitle}</div>
                    <p className="text-gray-700 text-base">
                        {user.description}
                    </p>
                </div>
                <div className="my-5 px-6">
                    <Link href={`/user/${user.id}`}>
                        <a className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">
                            Voir le profil</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard