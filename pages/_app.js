import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import InfoSection from "../components/InfoSection"
//import {UserProvider, useFetchUser } from "../utils/user"


import '../styles/index.css'

function MyApp({ Component, pageProps }) {
    
    //const {user, loading} = useFetchUser();
    return (
        <>
            <UserProvider value = {{user, loading}}>
                <Head>
                    <link rel="stylesheet" href="https://use.typekit.net/cpt5qbw.css"></link>
                    <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
                </Head>
                <Header userObj = {/*{user,loading}*/ null}/>
                <Layout children = {<Component {...pageProps} userObj = {/*{user,loading}*/ null} />}/>
                <InfoSection></InfoSection>
                <Footer/>
            </UserProvider>

        </>
    )

}

export default MyApp;