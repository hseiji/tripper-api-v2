const { Router } = require('express')
const router = Router()
const { getEvents, getEventsForPlan, addEventToPlan } = require('../controllers/events')

router.get('/events', getEvents);
router.get('/events/:planId', getEventsForPlan);
router.put('/events/:planId', addEventToPlan);

module.exports = router