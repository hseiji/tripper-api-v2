const { Router } = require('express')
// const { getEvents } = require('../controllers/auth')
// const { validationMiddleware } = require('../middlewares/validations-middleware')
// const { registerValidation, loginValidation } = require('../validators/auth')
// const { userAuth } = require('../middlewares/auth-middleware')
const router = Router()

router.get('/events', (req,res) => {
  return res.send("Hello there!")
})


module.exports = router