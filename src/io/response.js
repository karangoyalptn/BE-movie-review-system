const response = (err, req, res)=>{
    console.log("---->",err);
    res.status(200).send({
        "message": "success"
    });
};

export default response;