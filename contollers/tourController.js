const fs = require('fs');

// Read tours data from JSON file
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
    console.log(`tour id is: ${val}`);
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID provided',
        });
    }
    next();
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'missing name or price',
        });
    }
    next();
};

// Handler for getting all tours
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestTime: req.requestTime,
        result: tours.length,
        data: {
            tours,
        },
    });
};

// Handler for getting a single tour
exports.getOneTour = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;

    const tour = tours.find((el) => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
};

// Handler for creating a new tour
exports.createTour = (req, res) => {
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
};

// Handler for updating a tour
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>',
        },
    });
};

// Handler for deleting a tour
exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    });
};
