const express = require('express');
const app = express();

const router = express.Router();

//console.log('Inside src/routes/index.js i.e api routes');

const v1Routes = require('./v1');

router.use('/v1', v1Routes);

//console.log('Inside src/routes i.e api routes after triggering router.use("/v1", v1Routes) for v1 routes');


module.exports = router;
