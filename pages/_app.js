import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'


import '../styles/index.css'

function MyApp({ Component, pageProps }) {
    

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://use.typekit.net/cpt5qbw.css"></link>
            </Head>
            <Header/>
            <Layout children = {<Component {...pageProps} />}/>
            <Footer/>
        </>
    )

}

export default MyApp;