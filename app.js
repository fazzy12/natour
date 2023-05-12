// import the 'fs' module which is built-in in Node.js
const fs = require('fs');

// import the 'express' module, which is a third-party module that needs to be installed
const express = require('express');

// initialize the express app
const app = express();

app.use(express.json());

// Define a route for the GET method on the root path, which sends a JSON response to the client (currently commented out)
// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: `Welcome to my application`,
//         app: `natour`,
//     });
// });

// Define a route for the POST method on the root path, which sends a string response to the client (currently commented out)
// app.post('/', (req, res) => {
//     res.send(`you can post to this endpoint`)
// })

// Read the contents of the 'tours-simple.json' file and parse it as a JSON object, and store it in a 'tours' variable
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Define a route for the GET method on the '/api/v1/tours' path, which sends a JSON response to the client
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours,
        },
    });
});

app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tours: newTour,
                },
            });
        }
    );
});

// Start the server and listen for incoming requests on the defined 'port'
const port = 3000;
app.listen(port, () => {
    console.log(`listening on port  ${port}`);
});
