import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import InfoSection from "../components/InfoSection"
import {UserProvider, useFetchUser } from "../utils/user"


import '../styles/index.css'
import "../styles/profile.css"

function MyApp({ Component, pageProps }) {
    
    const {user, loading} = useFetchUser();
    return (
        <>
            <UserProvider value = {{user, loading}}>
                <Head>
                    <meta name = "viewport" content = "width=device-width,initial-scale=1"></meta>
                    <meta property = "og:title" content = "SpikeHub"></meta>
                    <meta property = "og:description" content = "The one-stop partner finder for Spikeball roundnet tournaments"></meta>
                    <meta property = "og:image" content = "https://res.cloudinary.com/dicfhqxoo/image/upload/v1594781483/thumbnails/Screenshot_67_l9wiq3.png"></meta>
                    <link rel="stylesheet" href="https://use.typekit.net/cpt5qbw.css"></link>
                    <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
                </Head>
                <Header userObj = {{user,loading}}/>
                <Layout children = {<Component {...pageProps} userObj = {{user,loading}} />}/>
                <Footer/>
            </UserProvider>

        </>
    )

}

export default MyApp;