const helpers = {
    "statusCodes" : {
        "SUCCESS" : 200,
        "BAD_REQUEST" : 400
    },
    "parseErrors" : (validationErros)=>{
        const errors = [];
        validationErros.forEach(e => {
            errors.push(e.message);
        });
        return errors.join(", ");
    }
};

export default helpers;