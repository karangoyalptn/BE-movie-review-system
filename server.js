import MongoDb from "./src/db/mongoDb.js";

export default class Server {
    constructor(){
        this.mongodb = new MongoDb();
        // this.redis = new this.redis();
    }

    init = async() => {
        await Promise.all([
            this.mongodb.init(),
            // this.redis.init()
        ])
    }

    close = async()=> {
        await Promise.all([
            this.mongodb.close()
        ])
    } 
}