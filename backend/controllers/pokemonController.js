const {Pokemon, Type, Nature, Ability} = require('../models');
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
        const pokemon = await Pokemon.findOne({where:{id}});
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

exports.getPokemonsByName = async (req, res) => {
    try {
        const { name } = req.params;
        const pokemons = await Pokemon.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        });
        if (!pokemons) return res.status(404).send('Pokemon not found');
        res.json(pokemons);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el pokemon');
    }
}