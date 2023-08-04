import '../styles/globals.css'
import "../styles/chat.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {SessionProvider} from "next-auth/react";
import NavBar from "../components/NavBar";

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return (
        <SessionProvider session={session}>
            <NavBar/>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MyApp
