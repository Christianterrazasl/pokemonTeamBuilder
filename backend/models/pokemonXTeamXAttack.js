const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const PokemonXTeamXAttack = sequelize.define('pokemonXTeamXAttack', {
    pokemonXTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    attackId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = PokemonXTeamXAttack;