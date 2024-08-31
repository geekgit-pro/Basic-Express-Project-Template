const express = require('express');
const router = express.Router();

const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares') 

router.
    post('/',
        CityMiddlewares.validateCreateRequest,
        CityController.createCity);

router.
    delete('/:id', CityController.destroyCity);


router.
    get('/', CityController.getCities);


router.
    get('/:id', CityController.getCity);

router.
    patch('/:id', 
            //AirplaneMiddlewares.validateCreateRequest,
            CityController.updateCity);


module.exports = router;