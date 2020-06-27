import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import {UserProvider, useFetchUser } from "../utils/user"


import '../styles/index.css'

function MyApp({ Component, pageProps }) {
    
    const {user, loading} = useFetchUser();
    return (
        <>
            <UserProvider value = {{user, loading}}>
                <Head>
                    <link rel="stylesheet" href="https://use.typekit.net/cpt5qbw.css"></link>
                </Head>
                <Header userObj = {{user,loading}}/>
                <Layout children = {<Component {...pageProps} userObj = {{user,loading}} />}/>
                <Footer/>
            </UserProvider>

        </>
    )

}

export default MyApp;