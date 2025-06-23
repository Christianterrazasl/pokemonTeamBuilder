const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const Attack = sequelize.define('attack', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accuarcy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    power: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    class:{
        type: DataTypes.STRING,
        allowNull: false
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Attack;
