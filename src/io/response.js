const response = (err, req, res, next)=>{
    req.statusCode = err;
    res.json({
        "status": err,
        "body": req.responseBody || {}
    });
};

export default response;