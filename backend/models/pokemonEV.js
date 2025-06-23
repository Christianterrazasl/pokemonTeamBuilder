const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const PokemonEV = sequelize.define('pokemonEV', {
    pokemonXTeamId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hp:{
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
    speed: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = PokemonEV;