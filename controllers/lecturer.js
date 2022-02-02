const Lecturer  = require('../schemas/Lecturer');
const jwt = require('jsonwebtoken');

module.exports = {
    login: (req, res, next) => {
        let password = req.body.password;
        let email = req.body.email;
        Lecturer.findOne({email, password})
        .then(lecturer => {
            if(lecturer) {
                let metadata = {
                    id: lecturer._id
                }
                const token = jwt.sign(metadata, process.env.JWT_SECRET, {expiresIn: '1d'});
                res.json({
                    data: {
                        auth_token: token,
                        email: lecturer.email,
                        name: lecturer.name,
                        courses: lecturer.courses
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
    },

    getCourses: (req, res, next) => {
        Lecturer.findById(req.user._id)
        .then(lecturer => {
            res.json({
                data: lecturer.courses,
                message: 'Success',
                status: 200
            });
        })        
        .catch(err=> {
            console.log(err);
            res.status(500).json({message: 'Something went wrong'});
        });  
    }
};