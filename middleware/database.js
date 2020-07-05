import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient('mongodb+srv://btbunze:spongeystar3@cluster0-h5gd7.mongodb.net/spikehubdb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function database(req, res, next) {
  console.log("opening database connection")
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('spikehubdb');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;