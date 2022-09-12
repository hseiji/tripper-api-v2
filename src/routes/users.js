const { Router } = require('express')
const { getUsers } = require('../controllers/users')
// const { getEvents } = require('../controllers/auth')
// const { validationMiddleware } = require('../middlewares/validations-middleware')
// const { registerValidation, loginValidation } = require('../validators/auth')
// const { userAuth } = require('../middlewares/auth-middleware')
const router = Router()

router.get('/users', getUsers);


module.exports = router