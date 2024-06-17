import mongoose from "mongoose";

export default class MongoDB {
    constructor(logger) {
        this.logger = logger;
        this.connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@dev.wgijvux.mongodb.net/?retryWrites=true&w=majority&appName=dev`;
    }

    init = async (logger) => {
        try {
            await mongoose.connect(this.connectionString, {
                maxPoolSize: 5,
                minPoolSize: 1,
                socketTimeoutMS: 45000, //in ms
            });
            logger.info("MongoDB connected");
        } catch (error) {
            logger.error({error: error.message, message: "Error connecting to MongoDB"});
            throw error;
        }
    }

    close = async (logger) => {
        try {
            await mongoose.disconnect();
            logger.info("MongoDB disconnected");
        } catch (error) {
            logger.error({error: error.message, message: "Error disconnecting from MongoDB"});
            throw error;
        }
    }
}
