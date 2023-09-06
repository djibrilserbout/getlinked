import Steps from "../components/home/Steps"
import Presentation from "../components/home/Presentation";
import Hero from "../components/home/Hero";
import Head from "next/head";

export default function Home() {
    return (
        <div>
            <Head>
                <title>getLinked | Accueil</title>
            </Head>
            <div className="h-32 md:h-40"></div>
            <Hero/>
            <div className="h-32 md:h-40"></div>
            <Steps/>
            <div className="h-32 md:h-40"></div>
            <Presentation/>
            <div className="h-10 md:h-40"></div>
        </div>
    )
}