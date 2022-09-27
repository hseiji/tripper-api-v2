const { Router } = require('express')
const { getUsers, getUserInfo, addNewUser } = require('../controllers/users')
const router = Router()

router.get('/users', getUsers);
router.get('/users/:userId', getUserInfo);
router.post('/users/', addNewUser);

module.exports = router