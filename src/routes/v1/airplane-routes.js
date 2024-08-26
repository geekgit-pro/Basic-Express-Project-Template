const express = require('express');
const router = express.Router();

const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');

//console.log('Inside src/routes/v1/airplane-routes before making router.post(/) i.e calling controller');
router.
    post('/', 
        AirplaneMiddlewares.validateCreateRequest,
        AirplaneController.createAirplane);

router.
    get('/', AirplaneController.getAirplanes);


router.
    get('/:id', AirplaneController.getAirplane);


router.
    delete('/:id', AirplaneController.destroyAirplane);

//console.log('Inside src/routes/v1/airplane-routes after making router.post(/) i.e calling controller');

module.exports = router;