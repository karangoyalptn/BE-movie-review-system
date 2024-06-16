import mongoose from "mongoose";
const { Schema } = mongoose;

const MovieSchema = new Schema({
    movieId: {
        type: Number,
        required: true,
        index: true
    },
    user: {
        type: String,
        required: true,
        index: true
    },
    review: {
        type: String,
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default MovieSchema;