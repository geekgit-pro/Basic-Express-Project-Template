const express = require('express');
const app = express();

const router = express.Router();

const { InfoController } = require('../../controllers');
const airplaneRoutes = require('./airplane-routes');

//console.log('Inside src/routes/v1/index.js befor router.use(/airplanes)');

router.use('/airplanes', airplaneRoutes);

//console.log('Inside src/routes/v1/index.js after router.use(/airplanes) for registering airplane routes');

router.get('/info', InfoController.info);

module.exports = router;