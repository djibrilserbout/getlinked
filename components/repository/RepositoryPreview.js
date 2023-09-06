import Link from "next/link";

const RepositoryPreview = (props) => {
    return (
        <div className="container mx-auto my-20">
            <div
                className="flex flex-col justify-between h-full bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-5/6 mx-auto text-black p-4">
                <div>
                    <div className={"font-bold text-xl mb-2"}>{props.repo.name}</div>
                    <div className="text-sm bg-gray-500 my-2 text-center w-1/3 p-1 text-white rounded-full">{props.repo.visibility}</div>
                    <div className={"my-2"}>{props.repo.description}</div>
                </div>
                <Link href={`/dashboard/${props.repo.name}`}>
                    <a className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">
                        Voir le projet</a>
                </Link>
            </div>
        </div>
    );
}

export default RepositoryPreview;