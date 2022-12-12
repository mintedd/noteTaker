//Dependencies 
const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./routes/api');
const htmlRouter = require('./routes/html');
const PORT = process.env.PORT || 3001

//Sets up server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware
app.use(express.static('public'));

//Routes
app.use('/', htmlRouter);
app.use('/api', apiRouter);

app.listen(PORT, () =>{
    console.log(`App is listening at http://localhost:${PORT} 🚀`)
});