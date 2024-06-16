import express from "express";
import movieController from "../../preHook/movieController.js";

const router = express.Router();
router.route("/movie/review/:id").get(movieController.getReviews);
router.route("/movie/saveReview").post(movieController.saveReviews);
router.route("/review/:id")
    .get(movieController.getReview)
    .put(movieController.updateReview)
    .delete(movieController.removeReview);

export default router;