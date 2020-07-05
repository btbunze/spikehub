import nextConnect from "next-connect"
import middleware from "../../middleware/database"

import {ObjectId} from 'mongodb'

const handler = nextConnect();

handler.use(middleware)


handler.get(async (req, res) =>{
    let doc = await req.db.collection("tournaments").find().toArray()
    res.send(JSON.stringify(doc))

})


handler.put(async (req, res) =>{
    let newTourney = req.body

    let doc = await req.db.collection("tournaments").insertOne(newTourney)
    res.send(JSON.stringify(doc))
  
})

handler.delete(async (req, res) =>{
    let tourneyID = req.body._id
  
  
    let doc = await req.db.collection("tournaments").deleteOne({"_id": ObjectId(tourneyID)},(err, result) => {
        if(err) throw err
        console.log(result.deletedCount)
    })

    res.send(JSON.stringify(doc))
  
})

export default handler
