export default function Presentation() {
    return(
        <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
                <p
                    className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600"
                >
                    Montre ta valeur
                </p>
                <h2 className="text-4xl font-bold">Fait par des développeurs pour des developpeurs</h2>
                <div className="h-6"></div>
                <p className="font-serif text-xl text-gray-400 md:pr-10">
                    Ce site à été développé par un étudiant qui a connu les difficultés lié à la recherche
                    d&apos;emploi.
                    L&apos;objectif est de répondre aux besoins des développeurs de demain.
                </p>
                <div className="h-8"></div>
                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
                    <div>
                        <div className={"flex"}>
                            <p className="font-semibold text-gray-400">Fait avec amour</p>

                            <div className="h-4 mr-1"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-6 h-6">
                                <path
                                    d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                            </svg>
                        </div>
                        <p className="font-serif text-gray-400 pt-4">
                            Projet d&apos;école développé pendant 2 années en parallèle d&apos;autres projets et
                            d&apos;une alternance.
                        </p>
                    </div>
                    <div>
                        <div className={"flex"}>
                            <p className="font-semibold text-gray-400">Un clic et c&apos;est déployé sur
                                internet</p>
                            <div className="h-4 mr-1"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-6 h-6">
                                <path fillRule="evenodd"
                                      d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z"
                                      clipRule="evenodd"/>
                            </svg>
                        </div>
                        <p className="font-serif text-gray-400 pt-4">
                            Tout en simplicité, vous choissisez votre branche et votre projet est en ligne grâce à l&apos;API GitHub Pages.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div
                    className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-900 to-black h-96"
                ></div>
            </div>
        </div>
    )
}