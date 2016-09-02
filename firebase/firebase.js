'use strict';

var firebase = require('firebase');
var FB = require('fb');
const config = require('../config/default.json');

module.exports = {
    pushUserInNeed:pushUserInNeed,
    initializeApp: initializeApp
};

function initializeApp() {
    var config = {
        apiKey: "AIzaSyA2tsbRsa1xG6zbSO7Kuw0_X4jy6qD2Z_M",
        authDomain: "siena-dashboard.firebaseapp.com",
        databaseURL: "https://siena-dashboard.firebaseio.com",
        storageBucket: "",
    };

    firebase.initializeApp(config);
}

function getDatabaseRef() {
    var database = firebase.database().ref('user_list');
    return database;
}

function pushUserInNeed(fbid) {

    var databaseRef = getDatabaseRef();
    var newUserRef = databaseRef.push();

    // get facebook name from id
    FB.api(fbid, {
        client_id: config.fbAppId,
        client_secret: config.fbAppSecret,
        access_token: config.fbPageAccessToken
    }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        // post user
        var name = res.first_name + ' ' + res.last_name;
        newUserRef.set({
            'name': name,
            'fbid': fbid
        });
    });
}