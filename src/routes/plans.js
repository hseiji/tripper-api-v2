const { Router } = require('express');
const { getEventsForPlan } = require('../controllers/events');
const { getPlansForUser } = require('../controllers/plans');
const router = Router()

router.get('/plans/:userId', getPlansForUser);

module.exports = router;