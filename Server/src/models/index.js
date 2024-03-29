const db = {};
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const _ = require('lodash');
const config = require('../config/config.js');

const sequelize = new Sequelize(
    config.DATABASE.NAME, config.DATABASE.USER, config.DATABASE.PASSWORD, {
    host: config.DATABASE.HOST,
    port: config.DATABASE.PORT,
    dialect: config.DATABASE.DIALECT,
    timezone: 'Asia/Kolkata',
    dialectOptions: {
        multipleStatements: true,
        connectTimeout: 1000 * 60 * 10
    },
    define: {
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
});

fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
    .forEach((file) => {  
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model; 
    });

db.Messages.belongsTo(db.User, { foreignKey: 'sent_by', as: 'sender'});
db.User.hasMany(db.Messages, { foreignKey: 'sent_by' });

db.GroupUserMap.belongsTo(db.User, { foreignKey: 'user_id', as: 'user'});
db.User.hasMany(db.GroupUserMap, { foreignKey: 'user_id' });



 
module.exports = _.extend({
    sequelize,
    Sequelize,
}, db);
