import auth0 from "../../utils/auth0";

export default async function me(req, res){
    try {
        const session = await auth0.getSession(req);
        console.log("session")
        console.log(session)
        await auth0.handleProfile(req, res, {})


    } catch (error) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
}