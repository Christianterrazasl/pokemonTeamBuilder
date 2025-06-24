const {Pokemon, Type} = require('../models');

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
        const {id} = req.params.id;
        const pokemon = await Pokemon.findOne({where:{id}});
        if (!pokemon) return res.status(401).send('Pokemon not found');
        res.json(pokemon);


    }catch(error){
        console.error(error);
        res.status(500).send('Error el obtener el pokemon')
    }
}
