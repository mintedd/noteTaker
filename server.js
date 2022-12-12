//Dependencies 
const express = require('express');
const app = express();
const path = require('path');
// const apiRouter = require('./routes/api');
// const htmlRouter = require('./routes/html');
const dbData = require('./db/db.json')
const PORT = process.env.PORT || 3001

//Sets up server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware
app.use(express.static('public'));

//Routes
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => res.json(dbData));
// app.use('/', htmlRouter);
// app.use('/api', apiRouter);

app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request recieved`);
    console.info(req.rawHeaders);
    console.info(`${req.method} request recieved`);
});

app.listen(PORT, () =>{
    console.log(`App is listening at http://localhost:${PORT} 🚀`)
});