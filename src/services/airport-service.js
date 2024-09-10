
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const airportRepository = new AirportRepository();

async function createAirport(data) {
    //console.log(req.body);
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);

                });
                console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch Airports', StatusCodes.INTERNAL_SERVER_ERROR);

    }
    
}


async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Requested airport not found', error.statusCode);
        }
        throw new AppError('Cannot fetch Airports', StatusCodes.INTERNAL_SERVER_ERROR);

    }
    
}

async function destroyAirport(id) {
    try {
        const airport = await airportRepository.destroy(id);
        return airport;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Requested airport to delete not found', error.statusCode);
        }
        throw new AppError('Cannot fetch Airport', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}


async function updateAirport(id, data) {
    try {
        const airport = await airportRepository.update(id, data);
        return airport;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Requested airport to update not found', error.statusCode);
        }
        
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);

                });
                console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot update Airport', StatusCodes.INTERNAL_SERVER_ERROR);
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
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}