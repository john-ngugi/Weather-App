"use strict";

var map = document.querySelector('.map');
var APP_ID = 'dc12568234cbb38938834a24eaab3ea8';
var map = L.map('map').setView([0, 0], 3);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map); //L.tileLayer(`http://maps.openweathermap.org/maps/2.0/weather/WND/3/0/0?opacity=0.9&fill_bound=true&appid=${APP_ID}`).addTo(map);

L.tileLayer("https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=".concat(APP_ID), {
  maxZoom: 10,
  minZoom: 0
}).addTo(map);