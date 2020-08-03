import nextConnect from "next-connect"
import middleware from "../../middleware/database"

import {ObjectId} from 'mongodb'

const handler = nextConnect();

handler.use(middleware)



handler.get(async (req, res) =>{

    let doc = await req.db.collection("tournaments").find().toArray()
    let sortedDoc = doc.filter((tourney) => {
                        const today = new Date()
                        //breaks on dates < 10?
                        const todayDate = `${today.getFullYear()}-${today.getMonth()+1 >= 10 ? today.getMonth()+1 : "0" + (today.getMonth() + 1)}-${today.getDate() >= 10 ? today.getDate() : "0" + today.getDate()}`
                        console.log(todayDate);
                        console.log(tourney.date)
                        return tourney.date >= todayDate
                    })
                    .sort((a,b) => {
                        return a.name > b.name ? 1:-1
                    }).sort((a,b) => {
                        return a.date > b.date ? 1:-1
                    })
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
