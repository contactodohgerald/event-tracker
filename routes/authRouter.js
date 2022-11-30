const express = require('express');
const router = express.Router();

const {registerUser, loginUser, getMe} = require('../controllers/AuthController')

router.post('/register-user', registerUser)
router.post('/login-user', loginUser)
router.get('/get-me/:userId', getMe)

module.exports = router;