
const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');


//const { error } = require('winston');

async function createAirplane(req, res) {
    try {
        //console.log('Inside createAirplane before calling createAirplane of service');
        console.log(req.body);
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
        
        //console.log('Inside createAirplane after calling createAirplane of service and returning json response');
                                                            //success: true
        return res                                          //message: 'Successfully created an airplane',
                .status(StatusCodes.CREATED)                //data: airplane,
                .json(SuccessResponse);
                                     //error: {}
                                                            
} catch (error) { 
        //console.log(`hi${ErrorResponse}`);                                           
        ErrorResponse.error = error; 
        //console.log(ErrorResponse.error);                      //success: false                  
        return res                                          //message: 'Something went wrong...airplane',
                .status(error.statusCode)  //data: {},
                .json(ErrorResponse);                       //error: error
    
    }
}

async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
                

    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }

}


async function getAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
                

    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }

}



module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
}
