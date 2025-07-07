const { isEmailValid, hashPassword, verifyPassword, generateToken } = require("../utils/utilFunctions");
const { User, AuthToken } = require("../models");



exports.registerUser = async (req, res) =>{

    try{    
        const {username, email, password} =req.body;
        if(username.trim() === '' || email.trim() === '' || password.trim() === '')
        return res.status(400).json({error: 'Todos los campos son requeridos'});

        if(!isEmailValid(email)) return res.status(400).json({error: 'El email no es valido'});

        const existingEmail = await User.findOne({where: {email}});
        const existingUsername = await User.findOne({where: {username}});
        if(existingUsername || existingEmail) return res.status(400).json({error: 'El email o usuario ya esta en uso'});

        const hashedPassword = await hashPassword(password);

        const user = await User.create({username, email, password: hashedPassword, isAdmin: false});
        
        res.json({message: 'Usuario creado correctamente', username: user.username, email: user.email});
}
    catch(error){
        console.error('Error al crear el usuario:', error);
        res.status(500).json({error: 'Error al crear el usuario'});
    }
}

exports.loginUser = async (req, res) => {
    try{    
        const {username, password} = req.body;
        if(username.trim() === '' || password.trim() === '')
        return res.status(400).json({error: 'Todos los campos son requeridos'});

        const user = await User.findOne({where: {username}});
        if(!user) return res.status(400).json({error: 'Usuario o contrasena incorrectos'});

        const isPasswordValid = await verifyPassword(password, user.password);
        if(!isPasswordValid) return res.status(400).json({error: 'La contraseña es incorrecta'});

        const tokenEntity = await AuthToken.create({token: generateToken(user.id), userId: user.id});
        const userdata = user.toJSON();
        delete userdata.password;
        return res.json({token:tokenEntity.token, user:userdata}); 
    }
    catch(error){
        console.error('Error al iniciar sesion:', error);
        res.status(500).json({error: 'Error al iniciar sesion'});
    }   

}

exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.findAll();
        res.json(users);
    }catch(error){
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({error: 'Error al obtener los usuarios'});
    }
    
}

exports.giveAdminPrivilleges = async(req, res) => {
    try{
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        if(!user) return res.status(400).json({error: 'El usuario no existe'});
        user.isAdmin = true;
        await user.save();
        res.json({message: 'Privilegios de admin dado correctamente'});

    }catch{
        console.error('Error al dar privilegios de admin');
        res.status(500).json({error: 'Error al dar privilegios de admin'});
    }
}

exports.removeAdminPrivilleges = async(req,res)=>{
    try{
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        if(!user) return res.status(400).json({error: 'El usuario no existe'});
        user.isAdmin = false;
        await user.save();
        res.json({message: 'Privilegios de admin quitados correctamente'});
    }catch(error){
        console.error('Error al quitar privilegios de admin:', error);
        res.status(500).json({error: 'Error al quitar privilegios de admin'});
    }
}

exports.changeUserPassword = async (req, res) => {
    try{
        const userId = req.params.userId;
        const {newPassword} = req.body;
        if(!newPassword || newPassword.trim() === '') return res.status(400).json({error: 'La nueva contrasena es requerida'});
        const user = await User.findByPk(userId);
        if(!user) return res.status(400).json({error: 'El usuario no existe'}); 
        user.password = await hashPassword(newPassword);
        await user.save();
        res.json({message: 'Contrasena cambiada correctamente'});
    }catch(error){
        console.error('Error al cambiar la contrasena:', error);
        res.status(500).json({error: 'Error al cambiar la contrasena'});
    }
}