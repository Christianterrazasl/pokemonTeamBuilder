const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const Item = sequelize.define('item', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Item;
