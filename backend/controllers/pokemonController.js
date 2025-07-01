const {Pokemon, Type, Nature, Ability, PokemonXAbility, Attack, AttackXPokemon} = require('../models');
const { Op } = require('sequelize');


exports.getAllPokemons = async (req, res) => {
    try{
        const pokemons = await Pokemon.findAll();
        res.json(pokemons);
    }
    catch(error){
        console.error('Error al obtener los pokemons:', error);
        res.status(500).json({error: 'Error al obtener los pokemons'});
    }
}

exports.createPokemon = async (req, res) =>{
    try{
        const {name, typeId, type2Id, hp, attack, defense, specialAttack, specialDefense, speed, previousFormId} = req.body;
        const imageUrl = req.file? '/uploads/'+req.file.filename : null;
        if(!imageUrl){
            return res.status(400).json({error: 'La imagen es requerida'});
        }
        const pokemon = await Pokemon.create({name, typeId, type2Id, imageUrl, hp, attack, defense, specialAttack, specialDefense, speed, previousFormId});
        res.json(pokemon);

    }catch(error){
        console.error('Error al crear el pokemon:', error);
        res.status(500).json({error: 'Error al crear el pokemon'});
    }
}

exports.createType = async (req, res) => {
    try {
        const { name } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'La imagen es requerida' });
        }

        const imageUrl = '/uploads/' + file.filename;
        const type = await Type.create({ name, imageUrl });
        res.json(type);

    } catch (error) {
        console.error('Error al crear el type:', error);
        res.status(500).json({ error: 'Error al crear el type' });
    }
};

exports.getAllTypes = async (req, res) => {
    try {
        const types = await Type.findAll();
        res.json(types);
    } catch (error) {
        console.error('Error al obtener los types:', error);
        res.status(500).json({ error: 'Error al obtener los types' });
    }
};

exports.getPokemonById = async(req, res)=>{
    try{
        const {id} = req.params;
        const pokemon = await Pokemon.findOne({where:{id}, 
            include: [{model: Type, as: 'primaryType'}, {model: Type, as: 'secondaryType'} ]});
        if (!pokemon) return res.status(401).send('Pokemon not found');
        res.json(pokemon);


    }catch(error){
        console.error(error);
        res.status(500).send('Error el obtener el pokemon')
    }
}

exports.getAllNatures = async (req, res) => {
    try {
        const natures = await Nature.findAll();
        res.json(natures);
    } catch (error) {
        console.error('Error al obtener las natures:', error);
        res.status(500).json({ error: 'Error al obtener las natures' });
    }
};

exports.createNature = async (req, res) => {
    try {
        const { name, description } = req.body;
        const nature = await Nature.create({ name, description });
        res.json(nature);
    } catch (error) {
        console.error('Error al crear la nature:', error);
        res.status(500).json({ error: 'Error al crear la nature' });
    }
}

exports.getAllAbilities = async (req, res) => {
    try {
        const abilities = await Ability.findAll();
        res.json(abilities);
    } catch (error) {
        console.error('Error al obtener las abilities:', error);
        res.status(500).json({ error: 'Error al obtener las abilities' });
    }
};

exports.createAbility = async (req, res) => {
    try {
        const { name, description } = req.body;
        const ability = await Ability.create({ name, description });
        res.json(ability);
    } catch (error) {
        console.error('Error al crear la ability:', error);
        res.status(500).json({ error: 'Error al crear la ability' });
    }
}

exports.addAbilityToPokemon = async (req, res) => {
    try {
        const { pokemonId, abilityId } = req.body;
        const pokemon = await Pokemon.findByPk(pokemonId);
        const ability = await Ability.findByPk(abilityId);
        if (!pokemon || !ability) {
            return res.status(404).json({ error: 'Pokemon o habilidad no encontrados' });
        }
        const pokemonXAbility = await PokemonXAbility.create({ pokemonId, abilityId });
        res.json(pokemonXAbility);
        
    } catch (error) {
        console.error('Error al agregar la habilidad al pokemon:', error);
        res.status(500).json({ error: 'Error al agregar la habilidad al pokemon' });
    }
}

exports.getAbilitiesByPokemonId = async (req, res) => {
    try {
        const { pokemonId } = req.params;
        const abilities = await PokemonXAbility.findAll({
            where: { pokemonId },
            include: {
                model: Ability,
                as: 'ability'
            }
        });
        if (!abilities) return res.status(404).send('No abilities found for this pokemon');
        res.json(abilities);
    }catch (error) {
        console.error('Error al obtener las habilidades del pokemon:', error);
        res.status(500).json({ error: 'Error al obtener las habilidades del pokemon' });
    }
}

exports.getPokemonsByName = async (req, res) => {
    try {
        const { name } = req.params;
        const pokemons = await Pokemon.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            },
            include:{
                model: Type,
                as: 'primaryType',
            }
        });
        if (!pokemons) return res.status(404).send('Pokemon not found');
        res.json(pokemons);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el pokemon');
    }
}

exports.createAttack = async (req, res) => {
    try {
        const { name, description, power, accuracy, category, typeId } = req.body;
        const attack = await Attack.create({ name, description, power, accuracy, category, typeId });
        res.json(attack);
    }catch (error) {
        console.error('Error al crear el ataque:', error);
        res.status(500).json({ error: 'Error al crear el ataque' });
    }
}

exports.makePokemonAbleToUseAttack = async (req, res) => {
    try {
        const { pokemonId, attackId } = req.body;
        const pokemon = await Pokemon.findByPk(pokemonId);
        const attack = await Attack.findByPk(attackId);
        if (!pokemon || !attack) {
            return res.status(404).json({ error: 'Pokemon o ataque no encontrados' });
        }
        const attackXPokemon = await AttackXPokemon.create({ pokemonId, attackId });
        res.json(attackXPokemon);
    } catch (error) {
        console.error('Error al agregar el ataque al pokemon:', error);
        res.status(500).json({ error: 'Error al agregar el ataque al pokemon' });
    }
}

exports.getAllAttacks = async (req, res) => {
    try {
        const attacks = await Attack.findAll();
        res.json(attacks);
    } catch (error) {
        console.error('Error al obtener los ataques:', error);
        res.status(500).json({ error: 'Error al obtener los ataques' });
    }
}

exports.getAttacksByPokemonId = async (req, res) => {
    try {
        const { pokemonId } = req.params;
        const pokemon = await Pokemon.findByPk(pokemonId);
        if (!pokemon) {
            return res.status(404).json({ error: 'Pokemon no encontrado' });
        }
        const attacks = await AttackXPokemon.findAll({
            where: { pokemonId },
            include: {
                model: Attack,
                as: 'attack'
            }
        });
        res.json(attacks);
    } catch (error) {
        console.error('Error al obtener los ataques del pokemon:', error);
        res.status(500).json({ error: 'Error al obtener los ataques del pokemon' });
    }
}