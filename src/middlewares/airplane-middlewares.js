
//const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
// const { message } = require('../utils/common/error-response');

const { StatusCodes } = require("http-status-codes")
const { error } = require("winston");
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
 
    if(!req.body.modelNumber) {
        ErrorResponse.message = 'Something went wrong while creating airplane';
        ErrorResponse.error = new AppError(['modelNumber not found '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    //success: false
                .json(ErrorResponse);               //message: 'Something went....aiplane'
                                                    //data: {}
                                                    //error: {}
    }
    next();
        
}

module.exports = {
    validateCreateRequest
}
