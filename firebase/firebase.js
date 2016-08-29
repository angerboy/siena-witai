'use strict';

var firebase = require('firebase');
var FB = require('fb');
const config = require('../config/default.json');

module.exports = {
    pushUserInNeed:pushUserInNeed,
    getFacebookAccessTokenAndRetrieveName:getFacebookAccessTokenAndRetrieveName
};

function getDatabaseRef() {
    var config = {
        apiKey: "AIzaSyA2tsbRsa1xG6zbSO7Kuw0_X4jy6qD2Z_M",
        authDomain: "siena-dashboard.firebaseapp.com",
        databaseURL: "https://siena-dashboard.firebaseio.com",
        storageBucket: "",
    };

    firebase.initializeApp(config);
    var database = firebase.database().ref('user_list');
    return database;
}

function getFacebookAccessTokenAndRetrieveName(fbid) {
    FB.api('oauth/access_token', {
        client_id: config.fbAppId,
        client_secret: config.fbAppSecret,
        grant_type: 'access_token'
    }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        var accessToken = res.access_token;
        pushUserInNeed(fbid, accessToken);
    });
}

function pushUserInNeed(fbid, accessToken) {

    var databaseRef = getDatabaseRef();
    var newUserRef = databaseRef.push();

    FB.setAccessToken(accessToken);

    FB.api(fbid, {
        fields: ['id', 'name'],
        accessToken: accessToken
    }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log(res.id);
        console.log(res.name);
    });

    newUserRef.set({
        'fbid': fbid
    });

    var path = newUserRef.toString();
    console.log("new user path:", path);
}