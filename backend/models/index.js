const {sequelize} = require('../config/db');
const Pokemon = require('./pokemon');
const Ability = require('./ability');
const Type = require('./type');
const Attack = require('./attack');
const AttackXPokemon = require('./attackXPokemon');
const Team = require('./team');
const Item = require('./item');
const Nature = require('./nature');
const PokemonIV = require('./pokemonIV');
const PokemonEV = require('./pokemonEV');
const User = require('./user');
const PokemonXTeam = require('./pokemonXTeam');
const PokemonXAbility = require('./pokemonXAbility');
// const PokemonXType = require('./pokemonXType');
const AuthToken = require('./authToken');


Pokemon.hasMany(PokemonXAbility, {foreignKey: 'pokemonId'});
PokemonXAbility.belongsTo(Pokemon, {foreignKey: 'pokemonId'});

Ability.hasMany(PokemonXAbility, {foreignKey: 'abilityId'});
PokemonXAbility.belongsTo(Ability, {foreignKey: 'abilityId'});

Team.hasMany(PokemonXTeam, {foreignKey: 'teamId', onDelete: 'CASCADE'});
PokemonXTeam.belongsTo(Team, {foreignKey: 'teamId'});

Pokemon.hasMany(PokemonXTeam, {foreignKey: 'pokemonId'});
PokemonXTeam.belongsTo(Pokemon, {foreignKey: 'pokemonId'});



Pokemon.hasMany(AttackXPokemon, {foreignKey: 'pokemonId'});
AttackXPokemon.belongsTo(Pokemon, {foreignKey: 'pokemonId'});

Attack.hasMany(AttackXPokemon, {foreignKey: 'attackId'});
AttackXPokemon.belongsTo(Attack, {foreignKey: 'attackId'});

User.hasMany(Team, {foreignKey: 'userId'});
Team.belongsTo(User, {foreignKey: 'userId'});

Attack.belongsTo(Type, {foreignKey: 'typeId'});
Type.hasMany(Attack, {foreignKey: 'typeId'});

PokemonXTeam.hasOne(PokemonIV, {foreignKey: 'pokemonXTeamId', onDelete: 'CASCADE'});
PokemonXTeam.hasOne(PokemonEV, {foreignKey: 'pokemonXTeamId', onDelete: 'CASCADE'});

PokemonXTeam.belongsTo(Nature, { foreignKey: 'natureId' });
Nature.hasMany(PokemonXTeam, { foreignKey: 'natureId' });

PokemonXTeam.belongsTo(Item, { foreignKey: 'itemId' });
Item.hasMany(PokemonXTeam, { foreignKey: 'itemId' });

Pokemon.belongsTo(Type, { foreignKey: 'typeId', as: 'primaryType' });
Pokemon.belongsTo(Type, { foreignKey: 'type2Id', as: 'secondaryType' });



async function syncDB() {
    try{
        await sequelize.sync({alter: true});
        console.log('Tablas sincronizadas con la base de datos');
    }
    catch(error){
        console.error('Error al sincronizar las tablas:', error);
    }

}
syncDB();


module.exports = {
    Pokemon,
    Ability,
    Type,
    Attack,
    AttackXPokemon,
    Team,
    Item,
    Nature,
    PokemonIV,
    PokemonEV,
    User,
    PokemonXTeam,
    PokemonXAbility,
    AuthToken,
};
