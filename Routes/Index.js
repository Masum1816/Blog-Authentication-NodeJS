const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/Controllers');

router.get('/', controllers.DefaultController);
router.get('/logIn', controllers.LogInController);
router.get('/signUp', controllers.SignUpController);
router.post('/logIn', controllers.LogInController);
router.post('/signUp', controllers.SignUpController);

module.exports = router;
