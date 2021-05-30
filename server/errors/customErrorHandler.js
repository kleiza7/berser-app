
import CustomError from '../helpers/error/CustomError.js'

const customErrorHandler = (err,req,res,next) => {
    let customError = err;
    
    
    if(err.name === "SyntaxError") {
        customError = new CustomError("Unexpected Syntax",400)
    }
    if(err.name === "ValidationError"){
        customError = new CustomError(err.message,400);
    }
    if(err.code === 11000) {
        // Duplicate Key
        customError = new CustomError("Duplicate Key Fond : Check Your Email",400)
    }
    if(err.name === "CastError"){
        customError = new CustomError("Please provide a valid id",400);
    }
    
    res
    .status(customError.status || 500)
    .json({
        success:false,
        message : customError.message
    });

};

export default customErrorHandler;