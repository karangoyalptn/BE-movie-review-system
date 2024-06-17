import MovieSchema from "../data/schemas/movie.js";
import helpers from "../miscellenous/helpers.js";

class Movie {
    static getReviews = async (req, res, next) => {
        try {
            const id = req.params.id;
            const movieReviews = await MovieSchema.find({ movieId: parseInt(id) }, { _id: 1, user: 1, review: 1 }) || [];
            req.responseBody = movieReviews;
            req.log.info({ data: JSON.stringify(movieReviews), message: "Got Movie Review" });
            next(helpers.statusCodes.SUCCESS);
        } catch (error) {
            req.log.error({ ...req.params, error: error.toString(), stack: error.stack, message: "Error getting Movie Review" });
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
            req.log.info({ data: JSON.stringify(savedMovie), message: "Created Movie Review" });
            next(helpers.statusCodes.SUCCESS);
        } catch (error) {
            req.log.error({ ...req.body, error: error.toString(), stack: error.stack, message: "Error creating Movie Review" });
            next(helpers.statusCodes.BAD_REQUEST);
        }
    }

    static getReview = async(req, res, next)=> {
        try {
            const id = req.params.id;
            const review = await MovieSchema.findOne({_id: id}, {_id:0, user: 1, review: 1 });
            if (!review) {
                throw new Error("review not found");
            }
            req.responseBody = review;
            next(helpers.statusCodes.SUCCESS);
        } catch (error) {
            req.log.error({ ...req.params, error: error.toString(), stack: error.stack, message: "Error getting ReviewById" });
            next(helpers.statusCodes.BAD_REQUEST);
        }
    }

    static updateReview = async(req, res, next)=> {
        try {
            const id = req.params.id;
            const review = await MovieSchema.findOneAndUpdate({_id: id, user: req.body.user}, {review: req.body.review, updatedAt: new Date()});
            if (!review) {
                throw new Error("review not found");
            }
            req.responseBody = review;
            next(helpers.statusCodes.SUCCESS);
        } catch (error) {
            req.log.error({ ...req.params, error: error.toString(), stack: error.stack, message: "Error updating ReviewById" });
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
        } catch (error) {
            req.log.error({ ...req.params, error: error.toString(), stack: error.stack, message: "Error deleting ReviewById" });
            next(helpers.statusCodes.BAD_REQUEST);
        }
    }
}

export default Movie;