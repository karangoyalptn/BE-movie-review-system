import helpers from "../miscellenous/helpers.js";

class ErrorMap {
    constructor(){
        this.saveReviewMapper = {
            "Review Limit exceeded, please try after sometime" : "Please try after sometime...",
            "default" : "something went wrong!"
        }
    }
    static saveReviews = async (code, req, res, next) => {
        try {
            if(req.errorMessage){
                req.errorMessage = mapper.saveReviewMapper[req.errorMessage] || mapper.saveReviewMapper["default"];
            }
            next(code);
        } catch (error) {
            req.errorMessage = mapper.saveReviewMapper["default"]
            next(helpers.statusCodes.BAD_REQUEST);
        }
    }
}

const mapper = new ErrorMap();

export default ErrorMap;