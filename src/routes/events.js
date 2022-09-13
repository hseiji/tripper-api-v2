const { Router } = require('express')
const router = Router()
const { getEvents } = require('../controllers/events')

router.get('/events', getEvents);


module.exports = router