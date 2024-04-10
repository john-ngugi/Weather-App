"use strict";

var temp = document.querySelector('.temperature');
var temper = document.querySelector('.temper');
var temper1 = document.querySelector('.temper1');
var temper2 = document.querySelector('.temper2');
var icon = document.querySelector('.Icon');
var icon1 = document.querySelector('.Icon1');
var icon2 = document.querySelector('.Icon2');
var wind = document.querySelector('.windy');
var wind1 = document.querySelector('.windy1');
var wind2 = document.querySelector('.windy2');
var city = document.querySelector('.cityname');
var btn = document.querySelector('.submit');
var form = document.getElementById('locationInput');
var search = document.getElementById('search');
var day = document.querySelector('.day');
var day1 = document.querySelector('.day1');
var day2 = document.querySelector('.day2');
/*const humidity = document.querySelector('.humidity');
const cloud = document.querySelector('.precipitation');
*/

var condition = document.querySelector('.condition-now');
var app = document.querySelector('.hero'); //defaut page when the page loads 

var cityInput = "Nairobi"; //add submit event to the form 

form.addEventListener('submit', function (e) {
  cityInput = search.value;
  getWeatherData();
  search.value = "";
  e.preventDefault();
});

function getWeatherData() {
  fetch("http://api.weatherapi.com/v1/forecast.json?key=4f46346cace64259af5195730221407&q=".concat(cityInput, "&days=6")).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data); //lets start by adding the temperature and weather data  

    temp.innerHTML = data.current.temp_c + "&#176;";
    condition.innerHTML = data.current.condition.text;
    /*
    let daynum = 5;
    let curr = 0;
    for (daynum; daynum != curr; curr++) {
        temper.in nerHTML = data.forecast.forecastday[curr].day.avgtemp_c + "&#176;";
    }
    */

    day.innerHTML = getDayName(data.forecast.forecastday[0].date);
    day1.innerHTML = getDayName(data.forecast.forecastday[1].date);
    day2.innerHTML = getDayName(data.forecast.forecastday[2].date);
    console.log(getDayName(data.forecast.forecastday[2].date));
    temper.innerHTML = "Max temp: " + data.forecast.forecastday[0].day.maxtemp_c + "&#176;";
    temper1.innerHTML = "Max temp: " + data.forecast.forecastday[1].day.maxtemp_c + "&#176;";
    temper2.innerHTML = "Max temp: " + data.forecast.forecastday[2].day.maxtemp_c + "&#176;";
    wind.innerHTML = "Max wind: " + data.forecast.forecastday[0].day.maxwind_kph + "km/h";
    wind1.innerHTML = "Max wind: " + data.forecast.forecastday[1].day.maxwind_kph + "km/h";
    wind2.innerHTML = "Max wind: " + data.forecast.forecastday[2].day.maxwind_kph + "km/h";
    var iconId = data.forecast.forecastday[0].day.condition.icon.substr("//cdn.weather.com/weather/64x64/".length);
    var iconId1 = data.forecast.forecastday[1].day.condition.icon.substr("//cdn.weather.com/weather/64x64/".length);
    var iconId2 = data.forecast.forecastday[2].day.condition.icon.substr("//cdn.weather.com/weather/64x64/".length); //reformat the url to your local folder path and add it to the page 

    icon.src = "./weather/weather/64x" + iconId;
    icon1.src = "./weather/weather/64x" + iconId1;
    icon2.src = "./weather/weather/64x" + iconId2;
    city.innerHTML = "".concat(cityInput); //set default time of day 

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

  function getDayName(dateStr) {
    var date = new Date(dateStr);
    var daynum = date.getDay();

    if (daynum == 1) {
      dayname = "Monday";
    }

    if (daynum == 2) {
      dayname = "Tuesday";
    }

    if (daynum == 3) {
      dayname = "Wednesday";
    }

    if (daynum == 4) {
      dayname = "Thursday";
    }

    if (daynum == 5) {
      dayname = "Friday";
    }

    if (daynum == 6) {
      dayname = "Saturday";
    }

    if (daynum == 0) {
      dayname = "Sunday";
    }

    return dayname;
  }
}

getWeatherData();