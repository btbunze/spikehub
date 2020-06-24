// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import nextConnect from "next-connect"
import middleware from "../../middleware/database"

const handler = nextConnect();

handler.use(middleware)


handler.get(async (req, res) =>{
  let doc = await req.db.collection("players").find().toArray()
  res.send(JSON.stringify(doc))

})

handler.put(async (req, res) =>{
  let newPlayer = req.body

  let doc = await req.db.collection("players").insertOne(newPlayer)
  res.send(JSON.stringify(doc))

})


export default handler
