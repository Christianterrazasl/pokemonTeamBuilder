const {Item} = require('../models');

exports.createItem = async (req, res) => {
    try {
        const {name, description} = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'La imagen es requerida' });
        }
        const imageUrl = '/uploads/' + file.filename;
        const item = await Item.create({name, description, imageUrl});
        res.json(item);
    } catch (error) {
        console.error('Error al crear el item:', error);
        res.status(500).json({ error: 'Error al crear el item' });
    }
}

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        console.error('Error al obtener los items:', error);
        res.status(500).json({ error: 'Error al obtener los items' });
    }
}