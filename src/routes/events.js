const { Router } = require('express')
const router = Router()
const { getEventsForPlan, addEventToPlan, deleteEvent, getEventById, markEventDone, getSearch, getEvents } = require('../controllers/events');
const { authToken } = require('../controllers/users');

// router.get('/events', getEvents);
// router.get('/events/id/:eventId', getEventById);


router.get('/events/:planId', authToken, getEventsForPlan);

router.put('/events/:planId', authToken, addEventToPlan);

router.delete('/events/id/:eventId', authToken, deleteEvent);

router.put('/events/done/:eventId', authToken, markEventDone);

router.get('/events/search/:keyword/:location', getSearch);

module.exports = router