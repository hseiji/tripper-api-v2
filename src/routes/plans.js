const { Router } = require('express');
const { getPlansForUser } = require('../controllers/plans');
const router = Router()

router.get('/plans/:userId', getPlansForUser);

module.exports = router;