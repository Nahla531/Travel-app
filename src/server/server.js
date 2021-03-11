// Setup empty JS object to act as endpoint for all routes
let endpoint = {};
let alldata = [];
// Express to run server and routes
const express = require('express');

// Start up an instance of app

const app = express();
//port
const port = 8000;

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

// Spin up the server
const server = app.listen(port, listening);
// Callback to debug
function listening() {
    console.log(`Example app listening on port ${port}!`)
};
// Initialize all route with a callback function
app.get('/all', sendData);
// Callback function to complete GET '/all'
app.get('/weatherdata', sendweather)
let pix = {};

function sendData(request, response) {
    response.send(JSON.stringify(endpoint));
}

function sendweather(request, response) {
    response.send(JSON.stringify(weather));
}

app.get('/pixdata', sendpix)

function sendpix(request, response) {
    response.send(JSON.stringify(pix));
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve('/dist/index.html'));
});


// getting location detalis and save them to endpoint object
app.post('/addTrip', addDataTrip);

function addDataTrip(request, response) {
    endpoint = {
        country: request.body.country,
        lng: request.body.lng,
        lat: request.body.lat,
        name: request.body.name,
        countdown: request.body.countdown,
        tripTime: request.body.tripTime
    }
    response.send(endpoint);
    alldata.push(endpoint)
}


//weather 
let weather = {};
const addDataWeather = (req, res) => {
    weather = {
        description: req.body.description,
        temp: req.body.temp
    }
    alldata.push(weather);
    res.send(weather)
    console.log(alldata);
}

app.post('/addweather', addDataWeather);


const addPic = (req, res) => {
    pix = {
        pic: req.body.pic
    }
    res.send(pix);
    alldata.push(pix)
}
app.post('/addpic', addPic);