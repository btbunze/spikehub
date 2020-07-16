import nextConnect from "next-connect"
import middleware from "../../middleware/database"

import {ObjectId} from 'mongodb'

const handler = nextConnect();

handler.use(middleware)

console.log("does this ever trigger?")


handler.get(async (req, res) =>{
    console.log("attempting to get tournaments")
    let doc = await req.db.collection("tournaments").find().toArray()
    let sortedDoc = doc.sort((a,b) => {
                        return a.name > b.name ? 1:-1
                    }).sort((a,b) => {
                        return a.date > b.date ? 1:-1
                    })
    console.log(doc)
    res.send(JSON.stringify(sortedDoc))

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
    })

    res.send(JSON.stringify(doc))
  
})

export default handler
