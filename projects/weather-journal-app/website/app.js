// Personal API Key for OpenWeatherMap API
const api_key = "&appid=8d6fecf996a61cf8ceb45716532b91f5&units=metric";

// Global Variables
const api_url = `https://api.openweathermap.org/data/2.5/weather?`;
const post_url = `http://localhost:8000/`;
let project_data = {
  temprature: 0,
  date: "",
  user_response: {},
};
let user_data = {
  zip: "",
  feelings: "",
};
const day = new Date();
const new_date = (day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear();

// Event listener to add function to existing HTML DOM element
let generate_btn = document.getElementById("generate");
generate_btn.addEventListener("click", () => generate());

// Function called by event listener
function generate() {
  user_data = {
    zip: document.getElementById("zip").value,
    feelings: document.getElementById("feelings").value,
  };

  getWeather(api_url, user_data.zip, api_key);
}

// Function to GET Web API Data
/*function getWeather(url, zip, api_key) {
  url = `${url}q=${zip}&APPID=${api_key}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      project_data = {
        temperature: data.main.temp,
        date: new_date,
        user_data: user_data,
      };
    }).then(() => {
      postData(post_url, project_data);
    })
}*/

async function getWeather(url, zip, api_key) {
  url = `${url}q=${zip}${api_key}`;
  let response = await fetch(url);
  let data = await response.json();
  project_data = {
    temperature: data.main.temp,
    date: new_date,
    user_data: user_data,
  };

  postData(post_url, project_data);
}

// Function to POST data
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const all_data = await response.json();
  updateUI(all_data);
}

// Function to GET Project Data
/*
async function retrieveData(url = "") {
  const request = await fetch(url);
  try {
    const allData = await request.json();
  } catch (error) {
    console.log("error", error);
  }
}*/

// Function to Update UI
async function updateUI(data) {
  console.log(data.temprature);
  document.getElementById("date").innerHTML = `Date: ${data.date}`;
  document.getElementById("temp").innerHTML = `Temp: ${data.temprature} C`;
  
  for (let key in data.user_data) {
    if (
      document.getElementById("content").childElementCount <
      Object.keys(data.user_data).length
    ) {
      document.getElementById(
        "content"
      ).innerHTML += `<span>${key}: ${data.user_data[key]}</span>`;
    } else {
      document.getElementById("content").innerHTML = "";
      document.getElementById(
        "content"
      ).innerHTML += `<span>${key}: ${data.user_data[key]}</span>`;
    }
  }
}
