const { Router } = require('express')
const router = Router()
const { getEvents, getEventsForPlan } = require('../controllers/events')

router.get('/events', getEvents);
router.get('/events/:planId', getEventsForPlan)

module.exports = router