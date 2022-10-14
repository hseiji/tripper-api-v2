const { Router } = require('express')
const router = Router()
const { getEventsForPlan, addEventToPlan, deleteEvent, getEventById, markEventDone, getSearch, getEvents } = require('../controllers/events');
const { authToken } = require('../controllers/users');

// router.get('/events', getEvents);
// router.get('/events/:planId', getEventsForPlan);

router.get('/events/:planId', authToken, getEventsForPlan);
// router.get('/events', getEventsForPlan);

router.put('/events/:planId', authToken, addEventToPlan);

router.get('/events/id/:eventId', getEventById);
router.delete('/events/id/:eventId', deleteEvent);

router.put('/events/done/:eventId', markEventDone);
router.get('/events/search/:keyword/:location', getSearch);

module.exports = router