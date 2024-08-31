
const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeValidationError' || error.name =='SequelizeUniqueConstraintError' ) {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);

                });
                console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new City object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function destroyCity(id) {
    try {
        const city = await cityRepository.destroy(id);
        return city;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Requested city to delete not found', error.statusCode);
        }
        throw new AppError('Cannot fetch City', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}



async function getCities() {
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch Cities', StatusCodes.INTERNAL_SERVER_ERROR);

    }
    
}


async function getCity(id) {
    //console.log(req.body);
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Requested city not found', error.statusCode);
        }
        throw new AppError('Cannot fetch Cities', StatusCodes.INTERNAL_SERVER_ERROR);

    }
    
}


async function updateCity(id, data) {
    try {
        const city = await cityRepository.update(id, data);
        return city;
    } catch (error) {
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Requested city to update not found', error.statusCode);
        }
        
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);

                });
                console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        if(error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);

                });
                console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot update City', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    updateCity,
    destroyCity,
    getCities,
    getCity
}