import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/E_com_DB"

let client;
export const connectToMongoDB = ()=>{
    MongoClient.connect(url)
        .then(clientInstance=>{
            client = clientInstance
            console.log("MongoDB is Connected")
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getDB=()=>{
    return client.db()
}

