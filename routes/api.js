const api = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');

api.get('/notes', (res, req) => {
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

api.post('/notes', (req, res) => {  
    const { title, text, id } = req.body;
  
    if (req.body) {
      const notes = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(notes, '../db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });

api.delete('/api/notes', (res, req) => {

});


module.exports = api;
