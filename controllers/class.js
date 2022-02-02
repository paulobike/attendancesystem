const Class  = require('../schemas/Class');
const Student  = require('../schemas/Student');

module.exports = {
    getClass: (req, res, next) => {
        let id = req.params.id;
        if(!req.user.courses.includes(id)) {
            let error = new Error('class not found');
            error.status = 404;
            return next(error);
        }
        Class.find({course: req.params.id}).populate('attendance')
        .then(classes => {
            let thisClass = [];
            Student.find()
            .then(students => {
                thisClass = classes.map(classObj => {
                    let attendance = students.map(student => {
                        return {
                            name: student.name,
                            regNumber: student.regNumber,
                            status: classObj.attendance.find(e => student._id.equals(e._id)) ? 'present': 'absent'
                        }
                    })
                    return {
                        count: classObj.classCount,
                        attendance
                    }
                });
                res.json({
                    status: 200,
                    message: 'Successful',
                    data: thisClass
                })
            }); 
        })        
        .catch(err=> {
            console.log(err);
            res.status(500).json({message: 'Something went wrong'});
        });     
    },

    createClass: (req, res) => {
        let id = req.params.id;
        if(!req.user.courses.includes(id)) {
            let error = new Error('class not found');
            error.status = 404;
            return next(error);
        }
        Class.findOne({course: id}).sort({classCount: -1})
        .then(lastClass => {
            let newCount;
            if(lastClass) newCount = lastClass.classCount + 1;
            else newCount = 1;
            Class.create({
                course: id,
                classCount: newCount,
                title: req.body.title,
                attendance: []
            }).then(classObj => {
                res.json({
                    status: 200,
                    message: 'Successful',
                    data: {
                        course: classObj.course,
                        id: classObj._id,
                        count: classObj.classCount
                    }
                });
            })
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
    },

    addStudent: (req, res, next) => {
        let id = req.params.id;
        let studentId = req.user._id;
        Class.findById(id)
        .then(lastClass => {
            if(!lastClass) {
                let error = new Error('class not found');
                error.status = 404;
                return next(error);
            }
            if(lastClass.attendance.includes(studentId)) {
                let error = new Error('Already signed');
                error.status = 409;
                return next(error);
            }
            lastClass.attendance.push(studentId);
            lastClass.save();
            res.json({
                status: 200,
                message: 'Successful',
                data: {
                    course: lastClass.course,
                    id: lastClass._id,
                    count: lastClass.classCount
                }
            });
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
    }
};