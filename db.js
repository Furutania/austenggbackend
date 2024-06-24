
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

      try {
        await this.client.connect();
        const database =  this.client.db(process.env.DB_NAME)
        const collection = database.collection(process.env.DB_COLLECTION);
        const document = await collection.find({},
          {
          projection: {
            _id: 1,
            name: 1,
            slug: 1,
            skills: 1,
            disc: 1,
          }
        }

        );


        const allDocuments = await document.toArray();
        console.log(allDocuments)
        return allDocuments;
      }
      catch{
        return [];
      } 
      finally {
        try{
          await this.client.close();
        }
        catch{
          return new Error("Error getting single");
        }
      }
    

      
    }
    async getSpecificProjects(docID){

      try {
        await this.client.connect();
        const database =  this.client.db(process.env.DB_NAME)
        const collection = database.collection(process.env.DB_COLLECTION);
        const objectId = new ObjectId(docID)
        const document = await collection.findOne({_id : objectId});
        console.log(document);
        return document;
      }
      catch{
        return new Error("Error getting single");
      }  
      finally {
        try{
          await this.client.close();
        }
        catch{
          return new Error("Error getting single");
        }
      }

    }
}


module.exports = dbCommunicator;
