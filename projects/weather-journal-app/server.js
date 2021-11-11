// Setup empty JS object to act as endpoint for all routes
let project_data = {
  temprature: 0,
  date: "",
  user_data: {}
};


// import express, { response } from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import fetch from "node-fetch";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;

/* Spin up the server*/
const server = app.listen(port, listening);

function listening() {
  console.log(`running on localhost:${port}`);
}

// GET route
app.get("/all", function (request, response) {
  response.send(project_data);
});

// POST route
app.post("/", function (request, response) {
  project_data.temprature = request.body.temperature;
  project_data.date = request.body.date;
  project_data.user_data = request.body.user_data;

  response.send(project_data);
});
