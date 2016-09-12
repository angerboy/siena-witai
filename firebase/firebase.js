'use strict';

var firebase = require('firebase');
var FB = require('fb');
const config = require('../config/default.json');
const constants = require('../config/constants');
var sessions;
var attendees;

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

    var config_2 = {
        apiKey: "AIzaSyCh8vOOD5TQad_cBWOWUsrPB0Lj3was-cc",
        authDomain: "siena-attendees.firebaseapp.com",
        databaseURL: "https://siena-attendees.firebaseio.com",
        storageBucket: "",
    };

    sessions = firebase.initializeApp(config);
    attendees = firebase.initializeApp(config_2, 'Secondary');
}

function getDatabaseRef() {
    var database = sessions.database().ref('user_list');
    return database;
}

function getAttendeeRef() {
    var database = attendees.database().ref('attendee_list');
    return database;
}

function getAttendeeList() {
    console.log("Get attendee list");
    return new Promise(function(resolve, reject) {
        var attendees = [];
        var attendeeRef = getAttendeeRef();
        attendeeRef.once('value', function(snapshot) {
            snapshot.forEach(function(snapshot) {
                console.log(snapshot.child("name").val());
                attendees.push(snapshot.child("name").val());
            });
            resolve(attendees);
        })
    })
}

function isDuplicateFBUser(fbid) {
    return new Promise(function(resolve, reject) {
        var dbRef = getDatabaseRef();
        dbRef.once('value', function(snapshot) {
            snapshot.forEach(function(snapshot) {
                if(snapshot.child("fbid").val() === fbid) {
                    console.log("already user");
                    resolve(true);
                }
            });
            console.log("not already user");
            resolve(false);
        })
    })
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
        isDuplicateFBUser(fbid).then(
            function(isDuplicateUser) {
                console.log("isDuplicateUser: ", isDuplicateUser);
                if(!isDuplicateUser) {
                    getAttendeeList().then(
                        function(attendees) {
                            var attendee  = attendees[Math.floor(Math.random()*attendees.length)]
                            var name = res.first_name + ' ' + res.last_name;
                            newUserRef.set({
                                'name': name,
                                'attendee':attendee,
                                'fbid': fbid
                            });
                        }
                    )
                }
            }
        )
    });
}