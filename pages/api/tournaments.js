import nextConnect from "next-connect"
import middleware from "../../middleware/database"

const handler = nextConnect();

handler.use(middleware)


handler.get(async (req, res) =>{
  let doc = await req.db.collection("tournaments").find().toArray()
  res.send(JSON.stringify(doc))

})


export default handler
