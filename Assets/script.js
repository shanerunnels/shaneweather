// let's make lots of variables 
let searchInput = document.querySelector(".search-input");
let cityName = document.querySelector(".cityName");
let tempEl = document.querySelector(".temp");
let humEl = document.querySelector(".humidity");
let windspeedEl = document.querySelector(".windspeed");
let dayOne = document.querySelector(".day1");
let dayTwo = document.querySelector(".day2");
let dayThree = document.querySelector(".day3");
let dayFour = document.querySelector(".day4");
let dayFive = document.querySelector(".day5");
let key = "348a18d8fbca1c2ea93c979a09ea9f14";
let cityHistory = document.querySelector("#past-cities");
var searchHistory = [];

function getPastSearches(){
  cityHistory.innerHTML = "";
  var pastCities = JSON.parse(localStorage.getItem("pastSearches"));
  console.log(pastCities);
  if (pastCities) {
    searchHistory = pastCities;
    for (i=0; i<pastCities.length; i++) {
      
        var newCity = document.createElement("button");
        newCity.textContent = pastCities[i];
        newCity.setAttribute("class", "cityButton");
        newCity.setAttribute("data-city", pastCities[i]);
        cityHistory.appendChild(newCity);
    };
  }
  
}

getPastSearches();

// on click all this is gonna go down.
$(".search-btn").on("click", function () {
  let input = searchInput.value;
  searchHistory.push(input);
  console.log(input);
  localStorage.setItem("pastSearches", JSON.stringify(searchHistory));
  getPastSearches();
  //run get weather function
  buildWeather(input);
});

// click handler for past city buttons
$(".cityButton").on("click", function (){
  buildWeather($(this).attr("data-city"));
});

// fdunction to get the weather
function buildWeather (city) {
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    key;
  let FiveDay =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    key;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cityName.innerHTML =
        "Today in " +
        data.name +
        `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></img>`;
      tempEl.innerHTML =
        "Temperature: " +
        Math.floor((data.main.temp - 273.15) * 1.8 + 32) +
        "&#8457";
      humEl.innerHTML = "Humidity: " + data.main.humidity + "%";
      windspeedEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
    });

  fetch(FiveDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      dayOne.innerHTML = `
      <p>${data.list[0].dt_txt}</p>
      <img src="http://openweathermap.org/img/wn/${
        data.list[0].weather[0].icon
      }.png">
      <p>temp: ${Math.floor(
        (data.list[0].main.temp - 273.15) * 1.8 + 32
      )} &#8457</p>
      <p>humidity: ${data.list[0].main.humidity}%</p>
      `;
      dayTwo.innerHTML = `
      <p>${data.list[8].dt_txt}</p>
      <img src="http://openweathermap.org/img/wn/${
        data.list[8].weather[0].icon
      }.png">
      <p>temp: ${Math.floor(
        (data.list[8].main.temp - 273.15) * 1.8 + 32
      )} &#8457</p>
      <p>humidity: ${data.list[8].main.humidity}%</p>
      `;
      dayThree.innerHTML = `
      <p>${data.list[16].dt_txt}</p>
      <img src="http://openweathermap.org/img/wn/${
        data.list[16].weather[0].icon
      }.png">
      <p>temp: ${Math.floor(
        (data.list[16].main.temp - 273.15) * 1.8 + 32
      )} &#8457</p>
      <p>humidity: ${data.list[16].main.humidity}%</p>
      `;
      dayFour.innerHTML = `
      <p>${data.list[24].dt_txt}</p>
      <img src="http://openweathermap.org/img/wn/${
        data.list[24].weather[0].icon
      }.png">
      <p>temp: ${Math.floor(
        (data.list[24].main.temp - 273.15) * 1.8 + 32
      )} &#8457</p>
      <p>humidity: ${data.list[24].main.humidity}%</p>
      `;
      dayFive.innerHTML = `
      <p>${data.list[32].dt_txt}</p>
      <img src="http://openweathermap.org/img/wn/${
        data.list[32].weather[0].icon
      }.png">
      <p>temp: ${Math.floor(
        (data.list[32].main.temp - 273.15) * 1.8 + 32
      )} &#8457</p>
      <p>humidity: ${data.list[32].main.humidity}%</p>
      `;
    });
};

