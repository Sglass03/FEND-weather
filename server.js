// Require Express to run server and routes
const express = require('express');
const port = 8000;

// Start up an instance of app
app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

// // Initialize the main project folder
app.use(express.static('website'));

// Global variables
let projectData = [{}]


// Setup Server
app.get('/get', (req, res) => {
    res.send(projectData);
    console.log("GET request");
});

app.post('/post', (req,res) => {
    let newData = req.body;
    projectData.push(newData); 
    console.log(projectData);
    res.send(projectData);
});

app.listen(port, () => {
    console.log(`Node app running on port ${port}`);
})