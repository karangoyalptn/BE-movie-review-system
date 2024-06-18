const response = (err, req, res, next)=>{
    req.statusCode = err;
    req.log.info("Responding to the request");
    res.json({
        "status": err,
        "error": req.errorMessage || null,
        "body": req.responseBody || {}
    });
};

export default response;