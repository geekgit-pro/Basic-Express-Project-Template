const express = require('express');
//const { PORT } = require('./config');
const { ServerConfig } = require('./config')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
const apiRoutes = require('./routes');

const router = express.Router();

//console.log('Inside src/index.js');

app.use('/api', apiRoutes);
//console.log('Inside src/index.js after triggering app.use("/api", apiRoutes) for api routes');
app.listen(ServerConfig.PORT, ()=> {
    console.log(`Successfully started the server at ${ServerConfig.PORT}`);
    //Logger.info('Server is live', {});
})