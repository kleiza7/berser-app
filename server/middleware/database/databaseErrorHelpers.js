import User from "../../models/user.js";
import asyncErrorWrapper from "express-async-handler";
import CustomError from '../../helpers/error/CustomError.js';

export const checkUserExist = asyncErrorWrapper(async(req,res,next) => {
    const {id} = req.params;
    const user = await User.findById(id);

    if(!user) {
        return next(new CustomError("There is no such user with that id",400));

    }
    next();

});

