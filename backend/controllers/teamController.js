const {Team, User, PokemonXTeam, Pokemon, PokemonEV, PokemonIV, Attack, Nature, Ability} = require('../models');

exports.createTeam = async (req,res)=>{
    try{
        const userId = req.user.id
        const {name} = req.body;
        const team = await Team.create({userId, name});
        res.json(team);
    }catch(error){
        console.error(error);
        res.status(500).send('Error al crear team');
    }
}

exports.getTeamsByUserId = async (req,res)=>{
    try{
        const userId = req.user.id;
        
        const teams = await Team.findAll({where:{userId}, include:{model:PokemonXTeam, include:{model:Pokemon}}});
        res.json(teams);
        
    }catch(error){
        console.error(error);
        res.status(500).send('Error al obtener teams');
    }
}

exports.addPokemonToTeam = async (req,res)=>{
    try{
        const user = req.user;
        let {teamId, pokemonId, alias, objectId, natureId, abilityId, attack1Id, attack2Id, attack3Id, attack4Id, ivs, evs} = req.body;
        if(!user){
            return res.status(401).send('No tienes permiso para agregar pokemon a team');
        }
        const totalEVs = Number(evs.hp) + Number(evs.attack) + Number(evs.defense) + Number(evs.specialAttack) + Number(evs.specialDefense) + Number(evs.speed);
        if(totalEVs > 510) {
            return res.status(400).send('La suma total de EVs no puede superar 510');
        }
        if(attack1Id != ''){
            const attack = await Attack.findByPk(attack1Id);
            if(!attack){
                return res.status(404).send('Attack not found');
            }
        }else{
            attack1Id = null;
        }
        if(attack2Id != ''){
            const attack = await Attack.findByPk(attack2Id);
            if(!attack){
                return res.status(404).send('Attack not found');
            }
        }else{
            attack2Id = null;
        }
        if(attack3Id != ''){
            const attack = await Attack.findByPk(attack3Id);
            if(!attack){
                return res.status(404).send('Attack not found');
            }
        }else{
            attack3Id = null;
        }
        if(attack4Id != ''){
            const attack = await Attack.findByPk(attack4Id);
            if(!attack){
                return res.status(404).send('Attack not found');
            }
        }else{
            attack4Id = null;
        }
        if(natureId != ''){
            const nature = await Nature.findByPk(natureId);
            if(!nature){
                return res.status(404).send('Nature not found');
            }
        }else{
            natureId = null;
        }
        if(abilityId != ''){
            const ability = await Ability.findByPk(abilityId);
            if(!ability){
                return res.status(404).send('Ability not found');
            }
        }else{
            abilityId = null;
        }
        if(objectId != ''){
            const pokemon = await Pokemon.findByPk(objectId);
            if(!pokemon){
                return res.status(404).send('Pokemon not found');
            }
        }else{
            objectId = null;
        }

        if(!teamId || !pokemonId){
            return res.status(400).send('TeamId y pokemonId son requeridos');
        }
        const team = await Team.findByPk(teamId);
        if(!team){
            return res.status(404).send('Team not found');
        }
        const pokemonXTeams = await PokemonXTeam.findAll({where:{teamId}});
        if(pokemonXTeams.length >= 6){
            return res.status(400).send('El team ya tiene 6 pokemons');
        }
        const pokemon = await Pokemon.findByPk(pokemonId);
        if(!pokemon){
            return res.status(404).send('Pokemon not found');
        }
        if(user.id !== team.userId){
            return res.status(401).send('No tienes permiso para agregar pokemon a este team');
        }
        const pokemonXTeam = await PokemonXTeam.create({teamId, pokemonId, alias, objectId, natureId, abilityId, attack1Id, attack2Id, attack3Id, attack4Id});
        const pokemonIV = await PokemonIV.create({pokemonXTeamId: pokemonXTeam.id, hp: ivs.hp, attack: ivs.attack, defense: ivs.defense, specialAttack: ivs.specialAttack, specialDefense: ivs.specialDefense, speed: ivs.speed});
        const pokemonEV = await PokemonEV.create({pokemonXTeamId: pokemonXTeam.id, hp: evs.hp, attack: evs.attack, defense: evs.defense, specialAttack: evs.specialAttack, specialDefense: evs.specialDefense, speed: evs.speed});



        res.json(pokemonXTeam);
    }catch(error){
        console.error(error);
        res.status(500).send('Error al agregar pokemon a team');
    }
}


exports.updatePokemonXTeam = async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId){
            return res.status(401).send('No tienes permiso para actualizar pokemonXTeam');
        }
        const { pokemonXTeamId } = req.params;
        let { alias, objectId, natureId, abilityId, attack1Id, attack2Id, attack3Id, attack4Id, ivs, evs } = req.body;

        const totalEVs = Number(evs.hp) + Number(evs.attack) + Number(evs.defense) + Number(evs.specialAttack) + Number(evs.specialDefense) + Number(evs.speed);
        if(totalEVs > 510) {
            return res.status(400).send('La suma total de EVs no puede superar 510');
        }
        if(attack1Id != ''){
            const attack = await Attack.findByPk(attack1Id);
            if(!attack){
                return res.status(404).send('Attack not found');
            }
        }else{
            attack1Id = null;
        }
        if(attack2Id != ''){
            const attack = await Attack.findByPk(attack2Id);
            if(!attack){
                return res.status(404).send('Attack not found');
            }
        }else{
            attack2Id = null;
        }
        if(attack3Id != ''){
            const attack = await Attack.findByPk(attack3Id);
            if(!attack){
                return res.status(404).send('Attack not found');
            }
        }else{
            attack3Id = null;
        }
        if(attack4Id != ''){
            const attack = await Attack.findByPk(attack4Id);
            if(!attack){
                return res.status(404).send('Attack not found');
            }
        }else{
            attack4Id = null;
        }
        if(natureId != ''){
            const nature = await Nature.findByPk(natureId);
            if(!nature){
                return res.status(404).send('Nature not found');
            }
        }else{
            natureId = null;
        }
        if(abilityId != ''){
            const ability = await Ability.findByPk(abilityId);
            if(!ability){
                return res.status(404).send('Ability not found');
            }
        }else{
            abilityId = null;
        }
        if(objectId != ''){
            const pokemon = await Pokemon.findByPk(objectId);
            if(!pokemon){
                return res.status(404).send('Pokemon not found');
            }
        }else{
            objectId = null;
        }

        const pokemonXTeam = await PokemonXTeam.findOne({ where: { id: pokemonXTeamId }, include: { model: Team } });
        if (!pokemonXTeam || pokemonXTeam.team.userId !== userId) {
            return res.status(404).send('PokemonXTeam no encontrado o no tienes permiso para actualizarlo');
        }
        await pokemonXTeam.update({ alias, objectId, natureId, abilityId, attack1Id, attack2Id, attack3Id, attack4Id});
        const pokemonIV = await PokemonIV.findOne({ where: { pokemonXTeamId: pokemonXTeam.id } });
        if (pokemonIV) {
            await pokemonIV.update({ hp: ivs.hp, attack: ivs.attack, defense: ivs.defense, specialAttack: ivs.specialAttack, specialDefense: ivs.specialDefense, speed: ivs.speed });
        } else {
            await PokemonIV.create({ pokemonXTeamId: pokemonXTeam.id, hp: ivs.hp, attack: ivs.attack, defense: ivs.defense, specialAttack: ivs.specialAttack, specialDefense: ivs.specialDefense, speed: ivs.speed });
        }
        const pokemonEV = await PokemonEV.findOne({ where: { pokemonXTeamId: pokemonXTeam.id } });
        if (pokemonEV) {
            await pokemonEV.update({ hp: evs.hp, attack: evs.attack, defense: evs.defense, specialAttack: evs.specialAttack, specialDefense: evs.specialDefense, speed: evs.speed });
        } else {
            await PokemonEV.create({ pokemonXTeamId: pokemonXTeam.id, hp: evs.hp, attack: evs.attack, defense: evs.defense, specialAttack: evs.specialAttack, specialDefense: evs.specialDefense, speed: evs.speed });
        }
        res.json(pokemonXTeam);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar PokemonXTeam');
    }
}




exports.deleteTeam = async (req, res) => {
    try {
        const userId = req.user.id;
        const { teamId } = req.params;
        const team = await Team.findOne({ where: { id: teamId, userId } });
        if (!team) {
            return res.status(404).send('Team no encontrado o no tienes permiso para eliminarlo');
        }
        await team.destroy();
        res.status(200).send('Team eliminado exitosamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar team');
    }
}

exports.removePokemonFromTeam = async (req, res) => {
    try {
        const userId = req.user.id;
        const { pokemonXTeamId } = req.params;
        const pokemonXTeam = await PokemonXTeam.findOne({ where: { id: pokemonXTeamId }, include: { model: Team } });
        if (!pokemonXTeam || pokemonXTeam.team.userId !== userId) {
            return res.status(404).send('PokemonXTeam no encontrado o no tienes permiso para eliminarlo');
        }
        await pokemonXTeam.destroy();
        res.status(200).send('PokemonXTeam eliminado exitosamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar PokemonXTeam');
    }
}

exports.getTeamById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { teamId } = req.params;
        const team = await Team.findOne({ where: { id: teamId, userId }, include:{model:PokemonXTeam, include:[{model:Pokemon}, {model:PokemonEV}, {model:PokemonIV}]} });
        
        if (!team) {
            return res.status(404).send('Team no encontrado o no tienes permiso para verlo');
        }
        res.json(team);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener team');
    }
}


exports.getPokemonXTeamById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { pokemonXTeamId } = req.params;
        const pokemonXTeam = await PokemonXTeam.findOne({ where: { id: pokemonXTeamId }, include: [{ model: Pokemon }, { model: PokemonEV }, { model: PokemonIV }] });
        if (!pokemonXTeam) {
            return res.status(404).send('PokemonXTeam no encontrado o no tienes permiso para verlo');
        }
        res.json(pokemonXTeam);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener PokemonXTeam');
    }
}

