'use strict';
var firebase = require('firebase');

const foodEmojis = [":hamburger:", ":pizza:", ":spaghetti:", ":poultry_leg:"];

const gifs = [
    "https://scontent.ford4-1.fna.fbcdn.net/v/t34.0-0/p206x206/13734713_10210066803134636_140725968_n.gif?oh=05e49bd66bf1db9fe93f55d79b1e04e9&oe=57B72335",
    "https://scontent.xx.fbcdn.net/v/t34.0-12/13689674_1206078516090571_1002039919_n.gif?_nc_ad=z-m&oh=edce47bfb414a64d9b327e93de6ae71c&oe=57B83833",
    "https://scontent.ford4-1.fna.fbcdn.net/v/t34.0-0/p206x206/13689798_10208685243061292_1121263181_n.gif?oh=7d5252a4fc215a76455286746cac0f01&oe=57B74850",
    "https://scontent.ford4-1.fna.fbcdn.net/v/t34.0-12/13664480_10210223394321720_1296576691_n.gif?oh=0e1445205175e958efed4c337e52e71f&oe=57B73527"
];

module.exports = {
    getJoke: getJoke,
    getFoodEmojis: getFoodEmojis,
    getGif: getGif,
    getSessionsConfg:getSessionsConfig,
    getAttendeeConfig:getAttendeeConfig
};

function getJoke() {
    return jokes[Math.floor(Math.random()*jokes.length)];
}

function getFoodEmojis() {
    return foodEmojis;
}

function getGif() {
    return gifs[Math.floor(Math.random()*gifs.length)];
}

function getSessionsConfig() {
    var config = {
        apiKey: "AIzaSyA2tsbRsa1xG6zbSO7Kuw0_X4jy6qD2Z_M",
        authDomain: "siena-dashboard.firebaseapp.com",
        databaseURL: "https://siena-dashboard.firebaseio.com",
        storageBucket: "",
    };
    return config;
}

function getAttendeeConfig() {
    var config = {
        apiKey: "AIzaSyCh8vOOD5TQad_cBWOWUsrPB0Lj3was-cc",
        authDomain: "siena-attendees.firebaseapp.com",
        databaseURL: "https://siena-attendees.firebaseio.com",
        storageBucket: "",
    };
    return config;
}

