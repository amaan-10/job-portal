const errorMiddleware = (error,req,res,next) => {
    console.log(error);
    res.status(500).send({
        // success: false,
        // message: "Something Went Wrong",
        error
    });
};

export default errorMiddleware;