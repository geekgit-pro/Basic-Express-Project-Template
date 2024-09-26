const express = require('express');
const router = express.Router();

const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');

router.
    post('/', 
        FlightMiddlewares.validateCreateRequest,
        FlightController.createFlight);

router.
    get('/',
        FlightController.getAllFlights);


router.
    get('/:id',
        FlightController.getFlight);
    


router.
    delete('/:id',
        FlightController.destroyFlight);



module.exports = router;