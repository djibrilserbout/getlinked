import '../styles/globals.css'
import "../styles/chat.css"
import {SessionProvider} from "next-auth/react";
import Header from "../components/Header";
import Footer from "../components/home/Footer"

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return (
        <SessionProvider session={session}>
            <div className="bg-gradient-to-br from-gray-900 to-black">
                <Header/>
                <div className="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
                <Component {...pageProps} />
                <Footer/>
                <div className="h-12"></div>
                </div>
            </div>
        </SessionProvider>
    )
}

export default MyApp
