import {fetchUser} from "../../utils/user"

export default async function updateUser(req, res) {

    //get an auth token
    const tokenRes = await fetch( 'https://dev-eu9734vc.us.auth0.com/oauth/token', { 
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"vwQaF1SuQox6y5VL93k3gtM3g27Hu46t","client_secret":"HkTOvOacm97CivoyA-8Z1sX-hpQNNoOBkc2xioY5bmFbUm6xjAIBBpvlixXyQKnI","audience":"https://dev-eu9734vc.us.auth0.com/api/v2/","grant_type":"client_credentials"}' 
    })
    const tokenObj = await tokenRes.json()
    const token = tokenObj.access_token

    const userId = JSON.parse(req.body).userId
    console.log(userId)

    //GET request for current user (oof had to use put bc get doesn't allow a body to be sent)
    //Gets current user's metadata
    if(req.method === "PUT"){
        try{

            const url = `https://dev-eu9734vc.us.auth0.com/api/v2/users/${userId}`
            console.log(url)
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type' : "application/json" 
                }
            })
            const user = await response.json();
            const userMeta = user.user_metadata ? user.user_metadata : {}
            res.status(200).json(userMeta);
        }catch(error){
            console.log("here")
            console.error(error);
            res.status(error.status || 500).end(error.message)
        }
    }

    //PATCH request for current user
    //Updates current user's metadata
    if(req.method == "PATCH"){
        const newMetaData = JSON.parse(req.body).player
        try {
            const url = `https://dev-eu9734vc.us.auth0.com/api/v2/users/${userId}`
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type' : "application/json" 
                },
                body:JSON.stringify({
                    user_metadata : newMetaData  
                })
            })
    
            const updatedUser = await response.json();
            res.status(200).json(updatedUser);
        }
        catch(error){
            console.error(error);
            res.status(error.status || 500).end(error.message)
        }
    }

    // if(req.method == "DELETE"){
    //     try{
    //         const url = `https://dev-eu9734vc.us.auth0.com/api/v2/users/${userId}`
    //     }
    //     catch(error){
    //         console.error(error);
    //         res.status(error.status || 500).end(error.message)
    //     }

    // }

}