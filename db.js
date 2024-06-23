
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const uri =  process.env.DB_URL

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
class dbCommunicator {

    constructor(){  
        this.client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
        });
        this.hashmap = new Map();
    }
    
    async getProjects() {
        //TODO find a way to store the data locally
        // and only pull when new data has been entered into db
        // if(this.hashmap.get('allProjects') !== undefined){
        //     return this.hashmap.get('allProjects');
        // }
      try {
        await this.client.connect();
        const database =  this.client.db(process.env.DB_NAME)
        const collection = database.collection(process.env.DB_COLLECTION);
        const document = await collection.find();
        const allDocuments = await document.toArray();
        return allDocuments;
      } finally {
        await this.client.close();
      }
    }
}


module.exports = dbCommunicator;
