// Setup empty JS object to act as endpoint for all routes
let endpoint = {};
let alldata = [];
// Express to run server and routes
const express = require('express');

// Start up an instance of app

const app = express();
//port
const port = 8000;


const server = app.listen(port, listening);

function listening() {
    console.log(`Example app listening on port ${port}!`)
};
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


// Initialize all route with a callback function
app.get('/all', sendData);
// Callback function to complete GET '/all'
app.get('/weatherdata', sendweather)
app.get('/weatherdataforecast', sendweatherforecast)

let pix = {};

function sendData(request, response) {
    response.send(JSON.stringify(endpoint));
}

function sendweatherforecast(request, response) {
    response.send(JSON.stringify(weatherforecast));
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
    res.sendFile('/dist/index.html');
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
                // data: req.body.data
        }
        // alldata.push(weather);
    res.send(weather)
    console.log(weather);
}
let weatherforecast = {};
const addDataWeatherForecast = (req, res) => {
    weatherforecast = {
        description: req.body.description,
        high_temp: req.body.high_temp,
        low_temp: req.body.low_temp

    }
    res.send(weatherforecast)

}

app.post('/addweather', addDataWeather);

app.post('/addweatherforcast', addDataWeatherForecast);

const addPic = (req, res) => {
    pix = {
        pic: req.body.pic
    }
    res.send(pix);
    alldata.push(pix)
}
app.post('/addpic', addPic);


module.exports = app;