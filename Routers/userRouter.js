const router = require("express").Router();
const UserController = require("../Controllers/UserController")

router.post('/register', (req, res) => UserController.RegisterUser(req, res))
router.post('/login', (req, res) => UserController.LoginUser(req, res))
router.get('/findUser/:id', (req, res) => UserController.findUser(req, res))
router.get('/', (req, res) => UserController.findAll(req, res))





module.exports = router
