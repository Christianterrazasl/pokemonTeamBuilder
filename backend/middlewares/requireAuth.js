const {AuthToken, User} = require('../models');

const requireAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({error: 'No autorizado'});
    const tokenEntity = await AuthToken.findOne({where: {token}});
    if(!tokenEntity) return res.status(401).json({error: 'No autorizado'});
    const user = await User.findByPk(tokenEntity.userId);
    if(!user) return res.status(401).json({error: 'No autorizado'});
    const jsonUser= user.toJSON();
    req.user = jsonUser;
    next();
}

module.exports = requireAuth;