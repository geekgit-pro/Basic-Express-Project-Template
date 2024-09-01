
const { ErrorResponse } = require('../utils/common');
// const { message } = require('../utils/common/error-response');

const { StatusCodes } = require("http-status-codes")
const { error } = require("winston");
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
 
    if(!req.body.name) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['Name not found '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }

    if(!req.body.code) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['Code not found '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }

    // if(!req.body.address) {
    //     ErrorResponse.message = 'Something went wrong while creating airport';
    //     ErrorResponse.error = new AppError(['Address not found '], StatusCodes.BAD_REQUEST);
    //     return res
    //             .status(StatusCodes.BAD_REQUEST)    
    //             .json(ErrorResponse);               
    // }

    if(!req.body.cityId) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['cityId not found '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }
    next();
        
}

module.exports = {
    validateCreateRequest
}
