const requireAuth = (req, res, next) => {
    const user = req.user;
    if (!user || !user.isAdmin) {
        return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
}