
const dotenv = require('dotenv');
dotenv.config();

// geonames API
const name = '&username=nahla1';
let apiURLgeon = 'http://api.geonames.org/searchJSON?q=';

//watherbit API
const apikey = process.env.API_KEY;
console.log(apikey);
let apiURLWeatherbitForcast = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';

let apiURLWeatherbitCurrent = 'https://api.weatherbit.io/v2.0/current?city=';
//getting the button
const generate = document.getElementById('generate');

let startDate = document.getElementById('start').value;
let endDate = document.getElementById('end').value;

// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', handlefunc);
const City = document.getElementById('city').value;

/* Function called by event listener */
async function handlefunc(event) {
    event.preventDefault();
    // const rows = '&maxRows=1';
    // const feelings = document.getElementById('feelings').value;
    getDataApi(apiURLgeon , City, name)
        .then(function(data) { // data is an object
            // console.log(data.geonames);
            // console.log(data.geonames[0]);
            // console.log(data.geonames[0].name);
            // console.log(data.geonames[0].countryName);
            // console.log(data.geonames[0].lng);
            // console.log(data.geonames[0].lat);
            postData('/addTrip', { country: data.geonames[0].countryName, lng: data.geonames[0].lng, lat: data.geonames[0].lat ,countdown:getCountDown(startDate)});

            
        })

        .then(function(data) {
            // updateUI();
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
        console.log(newData)
        return newData;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}


/* Function to GET Project Data */
const updateUI = async(url = '') => {
    const request = await fetch('/allData');
    try {
        const allData = await request.json();
        // document.getElementById('country').innerHTML = `country:  ${allData.country}`;
        // document.getElementById('long').innerHTML = `long is: ${allData.lng}`;
        // document.getElementById('lat').innerHTML = `latis: ${allData.lat}`;
        const container = document.getElementById('entryHolder');
        let div = document.createElement('div');
        container.appendChild(div);
        let p = document.createElement('p');
        p.innerHTML = `My trip to ${allData.name} ,${allData.country}`
        div.appendChild(p);
        let p2= document.createElement('p');
        
        p2.innerHTML = `Departing : ${startDate} `;
        div.appendChild(p2);
        let p3= document.createElement('p');
        div.appendChild(p3);
        let p5= document.createElement('p');

        p5.innerHTML = `leaving: ${endDate} `;
   div.appendChild(p5)
        // let countdownTime = getCountDown(startDate);
        // allData.countdownTime = getCountDown(startDate);

        p3.innerHTML = ` ${allData.name} ,${allData.country} is ${allData.countdown} days away `;
        let p4= document.createElement('p');
        div.appendChild(p4);
        p4.innerHTML =`Typical weather then is `;




        console.log(allData);
    } catch (error) {
        console.log("error", error);
    }
}

//weather function
const weatherFun = async(url = '') => {
    const request = await fetch('/allData');
    getDataApiWeather(apiURLWeatherbit,City,startDate ,endDate)

}


const getDataApiWeather = async(baseURL, city, startDate,endDate) => {
    const res = await fetch(baseURL + city + `&start_date=${startDate}&end_date=${endDate}&key=${apikey}`)
    try {

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

// get count down 
// refernce https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
const getCountDown = (date)=>
{
     // To set two dates to two variables 
     var date1 = new Date(); 
     var date2 = new Date(date); 
       
     // To calculate the time difference of two dates 
     var Difference_In_Time = date2.getTime() - date1.getTime(); 
       
     // To calculate the no. of days between two dates 
     var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
     return Difference_In_Days;
}


export {
    handlefunc

}