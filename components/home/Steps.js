export default function Steps() {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <div
                className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-br from-gray-900 to-black"
            >
                <p
                    className="flex items-center justify-center text-4xl font-semibold text-green-400 bg-green-800 rounded-full shadow-lg w-14 h-14"
                >
                    1
                </p>
                <div className="h-6"></div>
                <p className="font-serif text-3xl">Relève un challenge parmi notre sélection.</p>
            </div>
            <div
                className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-b from-gray-900 to-black"
            >
                <p
                    className="flex items-center justify-center text-4xl font-semibold text-indigo-400 bg-indigo-800 rounded-full shadow-lg w-14 h-14"
                >
                    2
                </p>
                <div className="h-6"></div>
                <p className="font-serif text-3xl">
                    Dépose ton code sur GitHub et déploie ton projet sur internet.
                </p>
            </div>
            <div
                className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-bl from-gray-900 to-black"
            >
                <p
                    className="flex items-center justify-center text-4xl font-semibold text-teal-400 bg-teal-800 rounded-full shadow-lg w-14 h-14"
                >
                    3
                </p>
                <div className="h-6"></div>
                <p className="font-serif text-3xl">Tape dans l&apos;oeil d&apos;un recruteur et discute avec lui
                    !</p>
            </div>
        </div>
    )
}