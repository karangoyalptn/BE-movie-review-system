import RedisServer from "ioredis";

const redisDB1 = new RedisServer(18109, `redis://default:${process.env.REDIS_PASSWORD}@redis-18109.c299.asia-northeast1-1.gce.redns.redis-cloud.com`, {db : 0})

export default class Redis {
    constructor(logger) {
        this.logger = logger;
        this.connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@dev.wgijvux.mongodb.net/?retryWrites=true&w=majority&appName=dev`;
    }

    init = async(logger)=>{
        try{
            await redisDB1.ping();
            logger.info("Redis connected");
        }catch(error){
            logger.error({error: error.message, message: "Error connecting to Redis"});
            throw error;
        }
    }
}