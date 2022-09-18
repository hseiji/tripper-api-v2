const { Router } = require('express')
const router = Router()
const { getEvents, getEventsForPlan, addEventToPlan, deleteEvent, getEventById, markEventDone } = require('../controllers/events')

router.get('/events', getEvents);
router.get('/events/:planId', getEventsForPlan);
router.put('/events/:planId', addEventToPlan);
router.get('/events/id/:eventId', getEventById);
router.delete('/events/id/:eventId', deleteEvent);
router.put('/events/done/:eventId', markEventDone);

module.exports = router