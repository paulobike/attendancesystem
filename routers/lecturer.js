const { isLecturer } = require('../middleware');

const { Router }  = require('express'),
router            = Router(),
lecturerController  = require('../controllers/lecturer.js');

router.post('/login', (req, res, next) => {lecturerController.login(req, res, next)});

router.get('/courses', isLecturer, (req, res, next) => {lecturerController.getCourses(req, res, next)});

module.exports = router; 