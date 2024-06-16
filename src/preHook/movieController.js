import MovieSchema from "../data/schemas/movie.js";
import helpers from "../miscellenous/helpers.js";

class Movie {
    static getReviews = async (req, res, next) => {
        try {
            console.log("---------------------->",req.params)
            const id = req.params.id;
            const movieReviews = await MovieSchema.findOne({ movieId: parseInt(id) }, { _id: 1, user: 1, review: 1 }) || [];
            req.responseBody = movieReviews;
            console.log({ data: JSON.stringify(movieReviews) }, "Got Movie Review");
            next(helpers.statusCodes.SUCCESS);
        } catch (error) {
            console.error({ ...req.params, error: error.toString(), stack: error.stack }, "Error getting Movie Review");
            next(helpers.statusCodes.BAD_REQUEST);
        }
    }

    static saveReviews = async (req, res, next) => {
        try {
            const newMovie = new MovieSchema({
                movieId: parseInt(req.body.movieId),
                user: req.body.user,
                review: req.body.review
            });

            const savedMovie = await newMovie.save();
            req.responseBody = {};
            console.log({ data: JSON.stringify(savedMovie) }, "Created Movie Review");
            next(helpers.statusCodes.SUCCESS);
        } catch (error) {
            console.error({ ...req.body, error: error.toString(), stack: error.stack }, "Error creating Movie Review");
            next(helpers.statusCodes.BAD_REQUEST);
        }
    }

    static getReview = async(req, res, next)=> {
        try {
            const id = req.params.id;
            const review = await MovieSchema.findOne({_id: id});
            if (!review) {
                throw new Error("review not found");
            }
            req.responseBody = review;
            next(helpers.statusCodes.SUCCESS);
        } catch (e) {
            console.error({ ...req.params, error: error.toString(), stack: error.stack }, "Error getting ReviewById");
            next(helpers.statusCodes.BAD_REQUEST);
        }
    }

    static updateReview = async(req, res, next)=> {
        try {
            const id = req.params.id;
            const review = await MovieSchema.findOneAndUpdate({_id: id, user: req.body.user}, {review: review});
            if (!review) {
                throw new Error("review not found");
            }
            req.responseBody = review;
            next(helpers.statusCodes.SUCCESS);
        } catch (e) {
            console.error({ ...req.params, error: error.toString(), stack: error.stack }, "Error updating ReviewById");
            next(helpers.statusCodes.BAD_REQUEST);
        }
    }

    static removeReview = async(req, res, next)=> {
        try {
            const id = req.params.id;
            const review = await MovieSchema.findOneAndDelete({_id: id, user: req.body.user});
            if (!review) {
                throw new Error("review not found");
            }
            req.responseBody = review;
            next(helpers.statusCodes.SUCCESS);
        } catch (e) {
            console.error({ ...req.params, error: error.toString(), stack: error.stack }, "Error deleting ReviewById");
            next(helpers.statusCodes.BAD_REQUEST);
        }
    }
}

export default Movie;