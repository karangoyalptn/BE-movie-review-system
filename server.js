import MongoDb from "./src/db/mongoDb.js";
import Redis from "./src/db/redis.js";

export default class Server {
    constructor(){
        this.mongodb = new MongoDb();
        this.redis = new Redis();
    }

    init = async() => {
        await Promise.all([
            this.mongodb.init(),
            this.redis.init()
        ])
    }

    close = async()=> {
        await Promise.all([
            this.mongodb.close()
        ])
    } 
}