const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const Type = sequelize.define('type', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Type;
