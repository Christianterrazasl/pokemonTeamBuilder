const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const Nature = sequelize.define('nature', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Nature;
