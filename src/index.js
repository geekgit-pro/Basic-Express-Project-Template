const express = require('express');
//const { PORT } = require('./config');
const { ServerConfig } = require('./config')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
const apiRoutes = require('./routes');
const airport = require('./models/airport');
const { where } = require('sequelize');

const router = express.Router();

//console.log('Inside src/index.js');

app.use('/api', apiRoutes);
//console.log('Inside src/index.js after triggering app.use("/api", apiRoutes) for api routes');
app.listen(ServerConfig.PORT, async ()=> {
    console.log(`Successfully started the server at ${ServerConfig.PORT}`);
    //Logger.info('Server is live', {});
    const { Airport, City} = require('./models');
    // const hyd1 = await City.findByPk(4);
    // console.log(hyd1);
    // console.log(".............................");
    // const hydairport1 = await hyd1.createAirport({ name: 'Hyderabad Airport 1', code: 'HYD' });
    // console.log(hydairport1);
    // const airportsInHyd = await hyd1.getAirports();
    // console.log(airportsInHyd)
    // await City.destroy({
    //     where: {
    //         id: 1
    //     }
    // });

    // const lucknow = await City.findByPk(5);
    // console.log(lucknow);
    // const lkoairport = await lucknow.createAirport({name: 'Lucknow Airport 1', code: 'LKO', cityId: 5 });
    // console.log(lkoairport);
    //const lkoAirports = await lucknow.getAirports();
    //console.log(lkoAirports);
    // const rblairport = await lucknow.createAirport({name: 'Rae Bareili Airport ', code: 'RBL'});
    // console.log(rblairport);
    // console.log(lkoAirports);
    // const rblairport = await Airport.findByPk(11);
    // console.log(rblairport);
    // await lucknow.removeAirport(rblairport);
    // await City.destroy({
    //     where: {
    //         id : 5
    //     }
    // });


})