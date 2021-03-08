// Setup empty JS object to act as endpoint for all routes
let endpoint = {};
//saving trips
let dataTrip = [];
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
app.use(bodyParser.urlencoded({ extended: false }));
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
app.get('/allData', sendData);
// Callback function to complete GET '/all'


function sendData(request, response) {
    response.send(JSON.stringify(endpoint));
    // console.log(endpoint);
}


// Routes

//get home page 
app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

// getting location detalis and save them to endpoint object
app.post('/addTrip', addDataTrip);

function addDataTrip(request, response) {
    console.log(request.body);
    endpoint = {
        country: request.body.country,
        lng: request.body.lng,
        lat: request.body.lat,
        countdown:request.body.countdown
    }
    dataTrip.push(endpoint)
    response.send(endpoint);
    console.log(endpoint);
    console.log(dataTrip);
}


// getting weather data and save the to endpoint object 

app.post('/getWeather', weatherData);

const weatherData = (req,res)=>{
    
}

//gettting picture of the location trip

app.post('/getPicture',getPicture);

const getPicture = (req,res) =>{
    
}