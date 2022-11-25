const express = require('express');

const router = express.Router();

const events = require('../controllers/EventController');

router.post('/create-event', events.createEvent)
router.get('/get-event/:eventId', events.getSingleEvent)
router.get('/user-events/:userId', events.getAllUserEvents)

module.exports = router;