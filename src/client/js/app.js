// geonames API
const name = '&username=nahla1';
let apiURL = 'http://api.geonames.org/searchJSON?q=';


document.getElementById('start').value = new Date().toISOString().substring(0, 10);
document.getElementById('end').value = new Date().toISOString().substring(0, 10);

// weather api data
const apiKey = '&key=81f6046d24444815bc19d493d096da66';
let apiURLWeatherbitForcast = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
let apiURLWeatherbitCurrent = 'https://api.weatherbit.io/v2.0/current?city=';

const generate = document.getElementById('generate');
// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', handlefunc);

/* Function called by event listener */
async function handlefunc(event) {
    event.preventDefault();
    let city = document.getElementById('city').value;
    let startDate = document.getElementById('start').value;
    let endDate = document.getElementById('end').value;
    let tripTime = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24);
    console.log(tripTime)
    let countdown = getCountDown(startDate);
    let weatherurl = '';
    // const feelings = document.getElementById('feelings').value;
    await getDataApi(apiURL, city, name)
        .then(function(data) { // data is an object
            console.log(data.geonames[0]);
            // console.log(data.list[0].main.temp);
            console.log(data.geonames[0].name);
            postData('/addTrip', { country: data.geonames[0].countryName, lng: data.geonames[0].lng, lat: data.geonames[0].lat, name: data.geonames[0].name, countdown: countdown, tripTime: tripTime });
        })
    weatherurl = await Weather();

    await getDataApi(weatherurl, city, apiKey)
        .then(function(data) {
            postData('/addweather', { description: data.data[0].weather.description, temp: data.data[0].temp })
            console.log('this is data', data.data[0].temp);

        })
        .then(function(data) {
            // console.log('alive');
            updateUI();
            // weatherurl = Weather();
            // getDataApi(weatherurl, city, apiKey).then(function(data) {
            //     console.log(data);
            // })

        });


};
/* Function to GET Web API Data*/

const getDataApi = async(baseURL, city, uname) => {

        const res = await fetch(baseURL + city + uname)
        try {

            const data = await res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("error", error);
            // appropriately handle the error
        }
    }
    /* Function to POST data */
const postData = async(url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}


/* Function to GET Project Data */
const updateUI = async(url = '') => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('country').innerHTML = `country name:  ${allData.country}`;
        document.getElementById('cityname').innerHTML = `city name: ${allData.name} and trip time is ${Math.floor(allData.tripTime)}`;
        console.log(allData);
    } catch (error) {
        console.log("error", error);
    }
    const request2 = await fetch('/weatherdata');
    try {
        const allData2 = await request2.json();
        document.getElementById('weather').innerHTML = `tempreture tthemn :  ${allData2.temp}`;

        console.log(allData2);
    } catch (error) {
        console.log("error", error);
    }


}

// get count down 
// refernce https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
const getCountDown = (date) => {
    // To set two dates to two variables 
    var date1 = new Date();
    var date2 = new Date(date);

    // To calculate the time difference of two dates 
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return (Math.floor(Difference_In_Days));
}


//weatherbit helper function 

const Weather = async(url = '') => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        if (allData.countdown > 7) {
            return url = `${apiURLWeatherbitForcast}`
        } else {
            return url = `${apiURLWeatherbitCurrent}`
        }

    } catch (error) {
        console.log("error", error);
    }
}

export {
    handlefunc,

}