const Student  = require('../schemas/Student');
const jwt = require('jsonwebtoken');

module.exports = {
    login: (req, res, next) => {
        let password = req.body.password;
        let regNumber = req.body.regNumber;
        Student.findOne({regNumber, password})
        .then(student => {
            if(student) {
                let metadata = {
                    id: student._id
                }
                const token = jwt.sign(metadata, process.env.JWT_SECRET, {expiresIn: '1d'});
                res.json({
                    data: {
                        auth_token: token,
                        regNumber: student.regNumber,
                        name: student.name
                    },
                    message: 'Success',
                    status: 200
                });
            } else {
                next(new Error('Invalid credentials'))
            }
        })        
        .catch(err=> {
            console.log(err);
            res.status(500).json({message: 'Something went wrong'});
        });     
    }
};