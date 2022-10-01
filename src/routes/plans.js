const { Router } = require('express');
const { getPlansForUser, addNewPlan, getPlans, deletePlan } = require('../controllers/plans');
const { authToken } = require('../controllers/users');

const router = Router()

// router.get('/plans', getPlans);
// router.get('/plans/:userId', getPlansForUser);

router.get('/plans', authToken, getPlansForUser);

router.put('/plans/:userId', addNewPlan);
router.delete('/plans/:planId', deletePlan);

module.exports = router;