const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const Team = sequelize.define('team', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Team;
