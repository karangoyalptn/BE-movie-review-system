import MongoDb from "./src/db/mongoDb.js";
import Redis from "./src/db/redis.js";
import winston from "winston";

export default class Server {
    constructor() {
        this.mongodb = new MongoDb();
        this.redis = new Redis();
        this.logger = winston.createLogger({
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console()
            ]
        });
    }

    getlogger = ()=> {
        return this.logger;
    }

    init = async () => {
        await Promise.all([
            this.mongodb.init(this.logger),
            this.redis.init(this.logger)
        ])
    }

    close = async () => {
        await Promise.all([
            this.mongodb.close(this.logger)
        ])
    }

    attachLogger = (req, res, next) => {
        req.log = this.logger.child({
            route: req.path
        })
        next();
    };
}