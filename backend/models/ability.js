const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const Ability = sequelize.define('ability', {
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

module.exports = Ability;
