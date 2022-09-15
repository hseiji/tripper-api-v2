const { Router } = require('express')
const { getUsers, getUserInfo } = require('../controllers/users')
const router = Router()

router.get('/users', getUsers);
router.get('/users/:userId', getUserInfo);
router.get('/plans/:userId', getPlansForUser);

module.exports = router