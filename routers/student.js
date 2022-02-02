const { Router }  = require('express'),
router            = Router(),
studentController  = require('../controllers/student');

router.post('/login', (req, res, next) => {studentController.login(req, res, next)});

module.exports = router; 