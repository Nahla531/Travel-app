// geonames API
const name = '&username=nahla1';
let apiURL = 'http://api.geonames.org/searchJSON?q=';
const generate = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', handlefunc);

/* Function called by event listener */
async function handlefunc(event) {
    event.preventDefault();
    const City = document.getElementById('city').value;
    // const rows = '&maxRows=1';
    // const feelings = document.getElementById('feelings').value;
    getDataApi(apiURL, City, name)
        .then(function(data) { // data is an object
            // console.log(data.geonames);
            console.log(data.geonames[0]);
            console.log(data.geonames[0].name);
            console.log(data.geonames[0].countryName);
            console.log(data.geonames[0].lng);
            console.log(data.geonames[0].lat);


            postData('/addTrip', { country: data.geonames[0].countryName, lng: data.geonames[0].lng, lat: data.geonames[0].lat });

        })
        .then(function(data) {
            updateUI();
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
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('country').innerHTML = `country:  ${allData.country}`;
        document.getElementById('long').innerHTML = `long is: ${allData.lng}`;
        document.getElementById('lat').innerHTML = `latis: ${allData.lat}`;
        console.log(allData);
    } catch (error) {
        console.log("error", error);
    }
}



export {
    handlefunc,

}