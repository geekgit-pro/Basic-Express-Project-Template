const express = require('express');
const app = express();

const router = express.Router();

const { InfoController } = require('../../controllers');
const airplaneRoutes = require('./airplane-routes');
const cityRoutes = require('./city-routes')
const airportRoutes = require('./airport-routes');

//console.log('Inside src/routes/v1/index.js befor router.use(/airplanes)');

router.use('/airplanes', airplaneRoutes);
router.use('/cities', cityRoutes );
router.use('/airports', airportRoutes);

//console.log('Inside src/routes/v1/index.js after router.use(/airplanes) for registering airplane routes');

router.get('/info', InfoController.info);

module.exports = router;