const { StatusCodes } = require('http-status-codes');
const { where } = require('sequelize');
const { Logger } = require('../config');
const AppError = require('../utils/errors/app-error');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        // try {
        //     //console.log('Inside create function of crud-repository befor calling await this.model.create(data) ');
        //     const response = await this.model.create(data);
        //     //console.log('Inside create function of crud-repository after calling await this.model.create(data) and returning a response ');
        //     return response;
        // } catch (error) {
        //     Logger.error('Something went wrong in the Crud Repo : create');
        //     throw error;
        // }
        const response = await this.model.create(data);
        return response

        

    }

    async destroy(data) {
        // try {
        //     const response = await this.model.destroy({
        //         where: {
        //             id: data
        //         }
        //     });
        //     return response;
        // } catch (error) {
        //     Logger.error('Something went wrong in the Crud Repo : destroy');
        //     throw error;
        // }

        const response = await this.model.destroy({
            where: {
                id: data
            }
        });
        if(!response) {
            throw new AppError('Could not found airplane data', StatusCodes.NOT_FOUND);
        }
        return response;
    }
    
    async get(data) {
        // try {
        //     const response = await this.model.findByPk(data);
        //     return response;
        // } catch (error) {
        //     Logger.error('Something went wrong in the Crud Repo : get');
        //     throw error;
        // }
        const response  = await this.model.findByPk(data);
        if(!response) {
            throw new AppError('Could not fetch airplane data', StatusCodes.NOT_FOUND);
        }
        return response;

    }

    async getAll() {
        // try {
        //     const response = await this.model.findAll();
        //     return response;
        // } catch (error) {
        //     Logger.error('Something went wrong in the Crud Repo : getAll');
        //     throw error;
        // }
        const response = await this.model.findAll();
        return response;
    }

    async update(id, data) {  // data is obj which has { col: value,....}
        // try {
        //     const response = await this.model.update(data, {
        //         where: {
        //             id: id
        //         }
        //     });
        //     return response;
        // } catch (error) {
        //     Logger.error('Something went wrong in the Crud Repo : update');
        //     throw error;
        // }
        const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response;
    }

}

module.exports = CrudRepository;