
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    //console.log(req.body);
    try {
        //console.log('Inside createAirplane of service before calling create function of repository');
        const airplane = await airplaneRepository.create(data);
        //console.log('Inside createAirplane of service before calling create function of repository and retrurning airplane object');
        return airplane;
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
        throw new AppError('Cannot create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch Airplanes', StatusCodes.INTERNAL_SERVER_ERROR);

    }
    
}


async function getAirplane(id) {
    //console.log(req.body);
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Requested airplane not found', error.statusCode);
        }
        throw new AppError('Cannot fetch Airplanes', StatusCodes.INTERNAL_SERVER_ERROR);

    }
    
}

async function destroyAirplane(id) {
    try {
        const airplane = await airplaneRepository.destroy(id);
        return airplane;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Requested airplane to delete not found', error.statusCode);
        }
        throw new AppError('Cannot fetch Airplane', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}


async function updateAirplane(id, data) {
    try {
        const airplane = await airplaneRepository.update(id, data);
        return airplane;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Requested airplane to update not found', error.statusCode);
        }
        
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);

                });
                console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot update Airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}