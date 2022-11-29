const express = require('express');

const router = express.Router();

const events = require('../controllers/EventController');

router.post('/create-event', events.createEvent)
router.get('/get-event/:eventId', events.getSingleEvent)
router.get('/user-events/:userId', events.getAllUserEvents)
router.patch('/update-event/:eventId', events.updateSingleEvent)
router.delete('/delete-event/:eventId', events.deleteEvent)

router.get('/get-users', events.getAllUser)


module.exports = router;