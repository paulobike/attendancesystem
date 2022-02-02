const mongoose = require('mongoose');
const methods  = require('./methods');
methods.fetchEnv();

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log('Mongoose connected')})
.catch(err => {console.log(err)});

const Student = require('./schemas/Student');
const Lecturer = require('./schemas/Lecturer');

let lecturers = ['Kingsley Okoye', 'Mike Raymond', 'Emeka Nwosu']
let students = ['Hilary Obi', 'Osu Tony', 'Ogochuckwu Dike','Mike Adebayo', 'Ramson Effiong',
 'Ada Obidike', 'Musa Simon', 'Nnamdi Peters', 'Umar Hauwa', 'Tobi Dickson']

function createStudent(i) {
    Student.create({
        name: students[i - 1], 
        regNumber: '2017514' + (i < 10? '00' + i : '0' + i),
        sex: i % 3? 'male': 'female',
        password: 'password'
    }).then(() => {console.log(`created${i}`)}).catch(err => {console.log(err)});
}

function createLecturer(i) {
    Lecturer.create({
        name: lecturers[i - 1], 
        email: 'lecturer' + i + '@as.test',
        password: 'password',
        courses: ['CSC 4' + Math.floor(99 * Math.random()), 'CSC 4' + Math.floor(99 * Math.random()), 'CSC 4' + Math.floor(99 * Math.random())]
    }).then(() => {console.log(`created${i}`)}).catch(err => {console.log(err)});
}

for(let i = 0; i < 10; i++) {
    createStudent(i + 1);
}

for(let i = 0; i < 3; i++) {
    createLecturer(i + 1);
}