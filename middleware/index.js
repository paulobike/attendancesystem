const jwt = require('jsonwebtoken');
const middleware = {};
const Student = require('../schemas/Student');
const Lecturer = require('../schemas/Lecturer');

const getToken = (req) => {
    if(req.get("authorization")) {
        return req.get("authorization");
    } else return null;    
}

const getMetadata = (req, token) => {
    if(!token) {
        return null
    }

    let metadata;
    try {
        metadata =  jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        console.log(err.message);
        metadata = {};
    }
    return metadata;
}

middleware.isLecturer = (req, res, next) => {
    const metadata = getMetadata(req, getToken(req));
    if(!metadata) {
        const error = new Error('lecturer not logged in.');
        error.status = 403;
        return next(error);
    }
    Lecturer.findById(metadata.id)
    .then(user => {
        if(user) {
            req.user = user;
            next();
        } else {
            const error = new Error('lecturer not logged in.');
            error.status = 403;
            next(error);
        }
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
}

middleware.isStudent = (req, res, next) => {
    const metadata = getMetadata(req, getToken(req));
    if(!metadata) {
        const error = new Error('student not logged in.');
        error.status = 403;
        return next(error);
    }
    Student.findById(metadata.id)
    .then(user => {
        if(user) {
            req.user = user;
            next();
        } else {
            const error = new Error('student not logged in.');
            error.status = 403;
            next(error);
        }
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
}

module.exports = middleware;