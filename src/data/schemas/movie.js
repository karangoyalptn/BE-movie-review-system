import mongoose from "mongoose";
import MovieSchema from "../models/movie.js";

const Movie = mongoose.model("movies.movies", MovieSchema);
export default Movie;