const express = require('express').Router();
const path = require('path');

const app = express();

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Wildcard
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

module.exports = app;
