const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const AttackXPokemon = sequelize.define('attackXPokemon', {
    attackId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pokemonId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = AttackXPokemon;