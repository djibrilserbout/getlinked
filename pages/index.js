import Head from 'next/head'
import styles from '../styles/Home.module.css'


export default function Home() {

    return (
        <>
            <Head>
                <title>getLinked</title>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>getLinked</h1>
                <h2>Montrer votre potentiel !</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>Marre d'entendre les recruteur dire que vous n'avez pas d'expérience pour un stage, une alternance pour un premier job ?<br />
                    Avec <b>getLinked</b>, créer des projets utile de A à Z et devenez attractif auprès des recruteurs !
                </p>
            </main>
        </>
    )
}
