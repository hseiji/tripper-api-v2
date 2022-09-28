const { Router } = require('express')
const { getUsers, getUserInfo, addNewUser, authUser } = require('../controllers/users')
const router = Router()

router.get('/users', getUsers);
router.get('/users/:userId', getUserInfo);
router.post('/users', addNewUser);
router.post('/users/login', authUser);

module.exports = router