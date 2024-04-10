"use strict";

var temp = document.querySelector('.temp');
var icon = document.querySelector('.icon');
var wind = document.querySelector('.wind');
var city = document.querySelector('.city-name');
var humidity = document.querySelector('.humidity');
var cloud = document.querySelector('.precipitation');
var condition = document.querySelector('.condition'); //const APIKEY = 'dc12568234cbb38938834a24eaab3ea8';

var app = document.querySelector('.hero');
var btn1 = document.querySelector('.submit');
var form1 = document.getElementById('locationInput');
var search1 = document.getElementById('search');
var temp1 = document.querySelector('.temperature');
var temper = document.querySelector('.temper');
var temper1 = document.querySelector('.temper1');
var temper2 = document.querySelector('.temper2');
var icon0 = document.querySelector('.Icon');
var icon1 = document.querySelector('.Icon1');
var icon2 = document.querySelector('.Icon2');
var wind0 = document.querySelector('.windy');
var wind1 = document.querySelector('.windy1');
var wind2 = document.querySelector('.windy2');
var city1 = document.querySelector('.cityname');
var btn = document.querySelector('.submit');
var form = document.getElementById('locationInput');
var search = document.getElementById('search');
var dayname = document.querySelector('.day');
var buttonNav = document.getElementById("button-nav");
var topNav = document.getElementById("myTopnav"); //const searchValue = search.value;
//defaut page when the page loads 

var cityInput = "nairobi"; //add submit event to the form 

form.addEventListener('submit', function (e) {
  cityInput = search.value;
  getWeatherData();
  search.value = "";
  e.preventDefault();
});

function getWeatherData() {
  fetch("http://api.weatherapi.com/v1/current.json?key=4f46346cace64259af5195730221407&q=".concat(cityInput, "&aqi=no")).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data); //lets start by adding the temperature and weather data  

    temp.innerHTML = data.current.temp_c + "&#176;";
    condition.innerHTML = data.current.condition.text;
    cloud.innerHTML = "cloud cover: " + data.current.cloud + "%";
    humidity.innerHTML = "humidity: " + data.current.humidity + "%";
    wind.innerHTML = "wind: " + data.current.wind_kph + "km/h";
    var iconId = data.current.condition.icon.substr("//cdn.weather.com/weather/64x64/".length); //reformat the url to your local folder path and add it to the page 

    icon.src = "./weather/weather/64x" + iconId;
    console.log(icon.src); //reformat the url to your local folder path and add it to the page 

    city.innerHTML = "".concat(cityInput); //set default time of day 

    timedate = new Date(data.location.localtime);
    var timeOfDay = "day"; //get the unique id for each weather condition 

    var code = data.current.condition.code; //change to night if its night time in the city 

    if (!data.current.is_day) {
      timeOfDay = "night";
    }

    if (code == 1000) {
      //set the background image to clear if weather is clear 
      app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/clear.jpg')";

      if (timeOfDay == "night") {
        app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/nightclear.jpg')";
      }
    } //same for cloudy weather 
    else if (code == 1003 || code == 1006 || code == 1009 || code == 1030 || code == 1069 || code == 1087 || code == 1276 || code == 1279 || code == 1282) {
        app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/cloudy3.jpg')";

        if (timeOfDay == "night") {
          app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/cloudynight1.jpg')";
        }
      } else if (code == 1063 || code == 1069 || code == 1072 || code == 1150 || code == 1153 || code == 1180 || code == 1183 || code == 1186 || code == 1189 || code == 1192 || code == 1195 || code == 1204 || code == 1207 || code == 1243 || code == 1246 || code == 1249 || code == 1252) {
        app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/rainy3.jpg')";

        if (timeOfDay == "night") {
          app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/rainy.jpg')";
        }
      } else if (code == 1240) {
        app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/raincloud.jpg')";

        if (timeOfDay == "night") {
          app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/raincloud.jpg')";
        }
      } else if (code == 1273) {
        app.style.backgroundImage = app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/thunder.jpg')";

        if (timeOfDay == "night") {
          app.style.backgroundImage = app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/thunder1.jpg')";
        }
      } else if (code == 1135) {
        app.style.backgroundImage = app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/fog.jpg')";

        if (timeOfDay == "night") {
          app.style.backgroundImage = app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/fog1.jpg')";
        }
      } //finaly snow 
      else {
          app.style.backgroundImage = app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/snowy.jpg')";

          if (timeOfDay == "night") {
            app.style.backgroundImage = app.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('./images/snowy2.jpg')";
          }
        } //fade fade in the page once all is done 


    app.style.opacity = "1";
  });
  /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
}

getWeatherData();
buttonNav.addEventListener('click', function myFunction() {
  if (topNav.className == "current-nav") {
    topNav.classList.remove("current-nav");
    topNav.classList.add("topnav");
    console.log("done");
  } else if (topNav.className == "topnav") {
    topNav.classList.remove('topnav');
    topNav.classList.add("current-nav");
  }
});