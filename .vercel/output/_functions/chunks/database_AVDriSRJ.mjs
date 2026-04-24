import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://leonel:leonel@cluster0.vml4b85.mongodb.net/";
const options = {};
let client;
let clientPromise;
{
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export { clientPromise as c };
