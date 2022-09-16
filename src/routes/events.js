const { Router } = require('express')
const router = Router()
const { getEvents, getEventsForPlan, addEventToPlan, deleteEvent } = require('../controllers/events')

router.get('/events', getEvents);
router.get('/events/:planId', getEventsForPlan);
router.put('/events/:planId', addEventToPlan);
router.delete('/events/:eventId', deleteEvent);

module.exports = router