/**
 * Sequelize initialization module
 */
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
    Sequelize,
    sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options),
    sequelize1: new Sequelize(config.sequelize1.uri, config.sequelize1.options)
};



// Insert models below
db.User = db.sequelize.import('../api/user/user.model');
db.DivisionPermission = db.sequelize.import('../api/user/divPermission.model');
db.Customer = db.sequelize.import('../api/user/customer.model');
module.exports = db;
