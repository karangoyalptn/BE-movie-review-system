import mongoose from "mongoose";

export default class MongoDB {
    constructor(logger) {
        this.logger = logger;
        this.connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@dev.wgijvux.mongodb.net/?retryWrites=true&w=majority&appName=dev`;
    }

    init = async () => {
        try {
            await mongoose.connect(this.connectionString, {
                maxPoolSize: 5,
                minPoolSize: 1,
                socketTimeoutMS: 45000, //in ms
            });
            console.log('MongoDB connected');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error.message);
            throw error;
        }
    }

    close = async () => {
        try {
            await mongoose.disconnect();
            console.log('MongoDB disconnected');
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error.message);
            throw error;
        }
    }
}
