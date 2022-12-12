//Dependencies 
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
// const apiRouter = require('./routes/api');
// const htmlRouter = require('./routes/html');
const uuid = require('./helpers/uuid');
const dbData = require('./db/db.json')
const PORT = process.env.PORT || 3001

//Sets up server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware
app.use(express.static('public'));

//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => res.status(200).json(dbData));
// app.use('/', htmlRouter);
// app.use('/api', apiRouter);

app.get('api/notes/:id', (req, res) => {
    res.json(`${req.method} request recieved`);
    console.info(req.rawHeaders);
    console.info(`${req.method} request recieved`);
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNotes = {
            title,
            text,
            id: uuid(),
        };

        //write the string to a file
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);

                // Add a new review
                parsedNotes.push(newNotes);

                // Write updated reviews back to the file
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated notes!')
                );
            }
        });
        if (req.body && req.params.id) {
            console.info(`${req.method} request received to add a note`);
            const notesId = req.params.id;
            console.log(notes.length);
            for (let i = 0; i < notes.length; i++) {
                const currentNotes = notes[i];
                if (currentNotes.id === notesId) {
                    currentNotes.notes += 1;
                    res.status(200).json(`New note is: ${currentNotes.notes}!`);
                    return;
                }
            }
            res.status(404).json('Review ID not found');
        }
        const response = {
            status: 'success',
            body: newNotes,
        };
        res.status(201).json(response);
    } else {
        res.status(400).json('Error in posting note');
    }

    // Log the response body to the console
    console.log(req.body);

});

// app.delete('/api/notes/:id', (req, res) => {
//     if (req.body && req.params.id) {
//         console.info(`${req.method} request received to add a note`);
//         const notesId = req.params.id;
//         console.log(notes.length);
//         for (let i = 0; i < notes.length; i++) {
//             const currentNotes = notes[i];
//             if (currentNotes.id === notesId) {
//                 currentNotes.notes += 1;
//                 res.status(200).json(`New note is: ${currentNotes.notes}!`);
//                 return;
//             }
//         }
//         res.status(404).json('Review ID not found');
//     }
// });




app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT} 🚀`)
});