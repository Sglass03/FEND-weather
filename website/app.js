/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=50498bcddb846b376b5641d1e658057d&units=imperial';
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// let zip = '02478';
// https://api.openweathermap.org/data/2.5/weather?zip=02478&appid=50498bcddb846b376b5641d1e658057d&units=imperial

// Create local URL info
const urlPost = 'http://localhost:8000/post'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Async Get request to Open Weather API
let openWeatherAPI = async (url, apiKey, zip) => {
    // test = document.getElementById('zip').value;
    // console.log(test);
    let res = await fetch(url+zip+apiKey)

    try {
        let data = await res.json();
        return data;
    } catch (error) {
        console.log("Error: ", error);
    }
}

// POST request to local server
let postRequest = async (url = '', data = {}) => {
    let res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        let newData = await res.json();
            return newData;
    } catch (error) {
        console.log("Error: ", error);
    }
}

// Update UI async function 
const updateUI = async (dataObject) => {
    document.getElementById('date').innerHTML = `Date: ${dataObject.date}`;
    document.getElementById('temp').innerHTML = `Temp: ${dataObject.temperature}`;
    document.getElementById('content').innerHTML = `Feelings: ${dataObject.userResponse}`;
}

// Run chained promises to: GET temperature data, POST that to server, then update UI
function mainFunction() {
    let zip = document.getElementById('zip').value;
    let userResponse = document.getElementById('feelings').value;
    openWeatherAPI(url, apiKey, zip)
        .then((data)=> {
            // Create data object
            let dataObject = {
                temperature: data.main.temp,
                date: newDate,
                userResponse: userResponse
            }

            return postRequest(urlPost, dataObject);
        }).then((response) => {
            updateUI(response);
        }).catch((error) => {
            console.log("Error", error);
        });
}

// Event listener to kickoff mainFunction
button = document.getElementById('generate');
button.addEventListener('click', mainFunction);