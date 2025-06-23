const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const Pokemon = sequelize.define('pokemon', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type2Id:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    attack: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    defense: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    specialAttack: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    specialDefense: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    speed:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    previousFormId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Pokemon;