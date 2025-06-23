const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const PokemonXAbility = sequelize.define('pokemonXAbility', {
    pokemonId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    abilityId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = PokemonXAbility;