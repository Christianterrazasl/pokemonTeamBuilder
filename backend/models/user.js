const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = User;