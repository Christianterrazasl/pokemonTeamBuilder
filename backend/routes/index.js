const router = require('express').Router();
const pokemonController = require('../controllers/pokemonController');
const userController = require('../controllers/userController');
const teamController = require('../controllers/teamController');
const itemController = require('../controllers/itemController');
const requireAuth = require('../middlewares/requireAuth');
const upload = require('../config/upload');

router.get('/pokemon', pokemonController.getAllPokemons);
router.post('/pokemon', upload.single('imageUrl') ,pokemonController.createPokemon);
router.get('/pokemon/:id', pokemonController.getPokemonById);
router.get('/pokemon/search/:name', pokemonController.getPokemonsByName);

router.get('/team', requireAuth, teamController.getTeamsByUserId);
router.post('/team', requireAuth, teamController.createTeam);
router.post('/team/pokemon', requireAuth, teamController.addPokemonToTeam);
router.delete('/team/:teamId', requireAuth, teamController.deleteTeam);
router.delete('/team/pokemon/:pokemonXTeamId', requireAuth, teamController.removePokemonFromTeam);
router.get('/team/:teamId', requireAuth, teamController.getTeamById);

router.post('/type', upload.single('imageUrl'), pokemonController.createType);
router.get('/type', pokemonController.getAllTypes);

router.get('/item', itemController.getAllItems);
router.post('/item', upload.single('imageUrl'), itemController.createItem);

router.get('/ability', pokemonController.getAllAbilities);
router.post('/ability', pokemonController.createAbility);
router.post('/ability/pokemon', pokemonController.addAbilityToPokemon);
router.get('/ability/pokemon/:pokemonId', pokemonController.getAbilitiesByPokemonId);

router.get('/nature', pokemonController.getAllNatures);
router.post('/nature', pokemonController.createNature);

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', userController.getAllUsers);


module.exports = router;
