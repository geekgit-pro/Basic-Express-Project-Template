const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
//const { CompareTime }  = require('../utils/helpers/datetime-helper');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    console.log("hi");
    try {
        const flight = await flightRepository.create(data);
        function compareTime(timeString1, timeString2) {
            let dateTime1 = new Date(timeString1);
            let dateTime2 = new Date(timeString2);
            return dateTime1.getTime() > dateTime2.getTime();
        }
        const { departureTime, arrivalTime } = data;
        if(!compareTime(arrivalTime,departureTime))
            throw new AppError('Arrival time must be greater than departure time', StatusCodes.BAD_REQUEST);

        console.log(data);
        return flight;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.BAD_REQUEST)
            throw new AppError('Arrival time must be greater than departure time', StatusCodes.BAD_REQUEST);
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);

                });
                console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";
    if(query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        //TO DO: Add a check that departureAirportId is not same as arrivalAirportId
    }

    if(query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000 : maxPrice)]
        }
    }

    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
            // [Op.gte]: query.tripDate
        };
    }

    if(query.sort) {
        const params = query.sort.split(",");
        console.log(params);
        const sortFilters = params.map((param) => param.split("_"));
        console.log(sortFilters);
        sortFilter = sortFilters;
    }
    //console.log(sortFilters);
    console.log(customFilter);
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch the data of requested flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Requested flight not found', error.statusCode);
        }
        throw new AppError('Cannot fetch Flights', StatusCodes.INTERNAL_SERVER_ERROR);

    }
    
}

async function updateSeats(data) {
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot update seats data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}




// async function getAirport(id) {
//     try {
//         const airport = await airportRepository.get(id);
//         return airport;
//     } catch (error) {
//         console.log(error);
//         if(error.statusCode == StatusCodes.NOT_FOUND) {
//             throw new AppError('Requested airport not found', error.statusCode);
//         }
//         throw new AppError('Cannot fetch Airports', StatusCodes.INTERNAL_SERVER_ERROR);

//     }
    
// }

async function destroyFlight(id) {
    try {
        const flight = await flightRepository.destroy(id);
        return flight;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Requested airport to delete not found', error.statusCode);
        }
        throw new AppError('Cannot fetch Airport', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}


// async function updateAirplane(id, data) {
//     try {
//         const airplane = await airplaneRepository.update(id, data);
//         return airplane;
//     } catch (error) {
//         console.log(error);
//         if(error.statusCode == StatusCodes.NOT_FOUND) {
//             throw new AppError('Requested airplane to update not found', error.statusCode);
//         }
        
//         if(error.name == 'SequelizeValidationError') {
//             let explanation = [];
//             error.errors.forEach((err) => {
//                 explanation.push(err.message);

//                 });
//                 console.log(explanation);
//             throw new AppError(explanation, StatusCodes.BAD_REQUEST);
//         }

//         throw new AppError('Cannot update Airplane', StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }



module.exports = {
    createFlight,
    getAllFlights,
    destroyFlight,
    getFlight,
    updateSeats
    //getAirports,
    //getAirport,
    //destroyAirport,
    //updateAirplane
}