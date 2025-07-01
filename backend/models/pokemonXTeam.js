const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');

const PokemonXTeam = sequelize.define('pokemonXTeam', {
    teamId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pokemonId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    alias:{
        type: DataTypes.STRING,
        allowNull: true
    },
    objectId:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    natureId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    abilityId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    attack1Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    attack2Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    attack3Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    attack4Id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = PokemonXTeam;