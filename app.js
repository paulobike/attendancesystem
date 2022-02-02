const express = require('express'),
mongoose      = require('mongoose'),
http          = require('http'),
app           = express(),
server        = http.createServer(app),
methods       = require('./methods');

app.use(express.json());

const studentRoutes = require('./routers/student');
const lecturerRoutes = require('./routers/lecturer');
const classRoutes = require('./routers/class');


methods.fetchEnv();
const PORT    = process.env.PORT,
IP            = process.env.IP;

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING + '?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {console.log('Mongoose connected')})
.catch(err => {console.log(err)});


app.use('/attendance/student', studentRoutes);
app.use('/attendance/classes', classRoutes);
app.use('/attendance/lecturer', lecturerRoutes);

app.use((error, req, res, next) => {
    res.json({
        data: error.message,
        message: Math.floor(error.status / 100) === 3? 'redirect' :'error',
        status: error.status || 500
    });
})
app.use('*', (req, res) => {
    res.status(404).json({
        data: 'Resource not found',
        message: 'error',
        status: 404
    });
});

server.listen(PORT, () => {
    console.log(`attendance system running on http://${IP || 'localhost'}:${PORT}`)
});