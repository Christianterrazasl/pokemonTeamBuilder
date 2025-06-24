const {Team, User, PokemonXTeam, Pokemon} = require('../models');

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
        const {userId} = req.user.id;
        const teams = await Team.findAll({where:{userId}, include:{model:PokemonXTeam}});
        res.json(teams);
        
    }catch(error){
        console.error(error);
        res.status(500).send('Error al obtener teams');
    }
}

