
const { ErrorResponse } = require('../utils/common');
// const { message } = require('../utils/common/error-response');

const { StatusCodes } = require("http-status-codes")
const { error } = require("winston");
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
 
    if(!req.body.flightNumber) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['flightNumber not found '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }

    if(!req.body.airplaneId) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['airplaneId not found '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }

    if(!req.body.departureAirportId) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['departureAirportId not found '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }

    if(!req.body.arrivalAirportId) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['arrivalAirportId not found '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }

    if(!req.body.departureTime) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['departureTime not found '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }

    if(!req.body.arrivalTime) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['arrivalTime not found '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }

    if(!req.body.price) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['price not found '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }

    // if(!req.body.boardingGate) {
    //     ErrorResponse.message = 'Something went wrong while creating airport';
    //     ErrorResponse.error = new AppError(['boardingGate not found '], StatusCodes.BAD_REQUEST);
    //     return res
    //             .status(StatusCodes.BAD_REQUEST)    
    //             .json(ErrorResponse);               
    // }

    if(!req.body.totalSeats) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['totalSeats not found '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }
    next();
        
}

module.exports = {
    validateCreateRequest
}
