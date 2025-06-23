const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const PokemonXType = sequelize.define('pokemonXType', {
    pokemonId: {
        type: DataTypes.INTEGER,
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

module.exports = PokemonXType;