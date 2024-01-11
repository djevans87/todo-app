require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";


//only create a client if there isn't one, if there already is one return it. Don't make a client every query
let client;

const connectToMongoDB = async () => {
  if (!client) {
    try {
        client = await MongoClient.connect(uri);
        console.log("connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:",error);
    }
  }
  return client;
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };