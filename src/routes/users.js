const { Router } = require('express')
const { getUsers, getUserInfo } = require('../controllers/users')
const router = Router()

router.get('/users', getUsers);
router.get('/users/:userId', getUserInfo);
// router.get('/users/:userId', (req,res) => {
//   getUserInfo(req.params.userId)
// });

module.exports = router