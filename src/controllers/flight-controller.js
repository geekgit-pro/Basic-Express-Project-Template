
const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');


async function createFlight(req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = flight;
        return res                                          
                .status(StatusCodes.CREATED)                
                .json(SuccessResponse);
} catch (error) {                                            
        ErrorResponse.error = error;            
        return res                                          
                .status(error.statusCode)  
                .json(ErrorResponse);                       
    
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        console.log("hi");
        SuccessResponse.data = flights;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;            
        return res                                          
                .status(error.statusCode)  
                .json(ErrorResponse); 
    }
}

async function getFlight(req, res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
                

    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }

}


async function destroyFlight(req, res) {
    try {
        const flight = await FlightService.destroyFlight(req.params.id);
        SuccessResponse.data = flight;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
                

    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }

}




module.exports = {
    createFlight,
    getAllFlights,
    destroyFlight,
    getFlight
   
    //getAirports,
    //getAirport,
    //destroyAirport,
    //updateAirplane
}
