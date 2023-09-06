import Image from "next/image";

export default function Footer(){
    return(
        <div className="grid gap-4 md:grid-cols-3">
            <ul className="space-y-1 text-gray-400">
                <Image src={"/final-logo.png"} width={"100"} height={"100"}/>
            </ul>
            <ul className="space-y-1 text-gray-400">
                <li className="pb-4 font-serif text-gray-400">Nos liens</li>
                <li>
                    <a href="mailto:contact@getlinked.dev" className="hover:underline">Adresse e-mail</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/company/getlinked-dev/about/?viewAsMember=true"
                       className="hover:underline">Linkedin</a>
                </li>
                <li>
                    <a href="https://etna.io" className="hover:underline">Site de l&apos;ETNA</a>
                </li>
            </ul>
            <ul className="space-y-1 text-gray-400">
                <li className="pb-4 font-serif text-gray-400">Accès</li>
                <li>
                    <a href="https://goo.gl/maps/DWqChHouH851YBS27" className="hover:underline">7, rue Maurice
                        Grandcoing,
                        94200 Ivry-sur-Seine</a>
                </li>
            </ul>
        </div>
    )
}