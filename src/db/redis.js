import RedisServer from "ioredis";

const redisDB0 = new RedisServer(18109, `redis://default:${process.env.REDIS_PASSWORD}@redis-18109.c299.asia-northeast1-1.gce.redns.redis-cloud.com`)

export default class Redis {
    constructor(logger) {
        this.logger = logger;
        this.keys();
    }

    keys = ()=>{
        this.user = (userId)=>`user:${userId}`;
    }

    init = async (logger) => {
        try {
            await redisDB0.ping();
            logger.info("Redis connected");
        } catch (error) {
            logger.error({ error: error.message, message: "Error connecting to Redis" });
            throw error;
        }
    }

    getUser = async (user) => {
        try {
            let data = await redisDB0.exists(this.user(user));
            return !data;
        } catch (error) {
            this.logger({ "error": error.message, "message": "Error while finding data from Redis" });
            return 1;
        }
    }

    setUser = async (user) => {
        try {
            const pipeline = redisDB0.pipeline();
            const key = this.user(user);
            pipeline.set(key, "true");
            pipeline.expire(key, 10);
            await pipeline.exec();
        } catch (error) {
            this.logger({ "error": error.message, "message": "Error while setting data to Redis" });
        }
    }
}