const api = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

api.get('/notes', (res, req) => {
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

api.post('/notes', (req, res) => {  
    // const { title, text, id } = req.body;
  
    // if (req.body) {
    //   const notes = {
    //     title,
    //     text,
    //     id: uuid(),
    //   };
  
    //   readAndAppend(notes, '../db/db.json');
    //   res.json(`Note added successfully 🚀`);
    // } else {
    //   res.error('Error in adding note');
    // } part of this is in the index.js? so i dont need it
  });

api.delete('/api/notes', (res, req) => {

});


module.exports = api;
