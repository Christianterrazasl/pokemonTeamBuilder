const router = require('express').Router();
const pokemonController = require('../controllers/pokemonController');
const userController = require('../controllers/userController');
const upload = require('../config/upload');

router.get('/pokemon', pokemonController.getAllPokemons);
router.post('/pokemon', upload.single('imageUrl') ,pokemonController.createPokemon);


router.post('/type', upload.single('imageUrl'), pokemonController.createType);
router.get('/type', pokemonController.getAllTypes);

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', userController.getAllUsers);

module.exports = router;
