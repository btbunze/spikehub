import nextConnect from "next-connect"
import middleware from "../../middleware/database"

const handler = nextConnect();

handler.use(middleware)


handler.get(async (req, res) =>{
  let doc = await req.db.collection("tournaments").find().toArray()
  console.log("doc")
  res.send(JSON.stringify(doc))

})


handler.put(async (req, res) =>{
    let newTourney = req.body

    let doc = await req.db.collection("tournaments").insertOne(newTourney)
    res.send(JSON.stringify(doc))
  
})

export default handler
