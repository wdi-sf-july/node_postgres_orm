var Sequelize = require('sequelize'),
    sequelize = new Sequelize('social_app', 'alex', '', {
      dialect: 'postgres',
      port: 5432,
      logging: false
    }), 
    SPerson = sequelize.define('Person', {
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING 
    }, {
      timestamps: false,
      tableName: 'people'
    });

module.exports.SPerson = SPerson;
