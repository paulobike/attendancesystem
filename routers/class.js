const { isLecturer, isStudent } = require('../middleware');

const { Router }     = require('express'),
router               = Router(),
classController = require('../controllers/class.js');

router.get('/:id', isLecturer, (req, res, next) => {classController.getClass(req, res, next)});

router.post('/:id', isLecturer, (req, res, next) => {classController.createClass(req, res, next)});

router.patch('/:id', isStudent, (req, res, next) => {
    classController.addStudent(req, res, next);
});

module.exports = router;