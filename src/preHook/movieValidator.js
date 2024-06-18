import Ajv from "ajv";
import saveReviewSchema from "./validatorSchemas/saveReview.js";
import helpers from "../miscellenous/helpers.js";

const ajv = new Ajv();

export default class AjvValidator {
    static saveReviews = async (req, res, next) => {
        try{
            const validate = ajv.compile(saveReviewSchema);
            const result = await validate(req.body);
            if(!result){
                throw new Error(helpers.parseErrors(validate.errors));
            }
        }catch(error){
            if (error instanceof Ajv.ValidationError){
                error = helpers.parseErrors(error.errors);
            }
            req.errorMessage = "Error while validating saveReview";
            req.log.error({error: error.toString(), message: req.errorMessage });
            req.responseStatus = helpers.statusCodes.BAD_REQUEST;
        }finally{
            next(req.responseStatus);
        }
    }
}
