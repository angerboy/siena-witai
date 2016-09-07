'use strict';

const config = require('../config/default.json');
const request = require('request');

module.exports = {
    getFacebookID: getFacebookID,
    putFacebookID: putFacebookID
};

/**
 * Checks to see if this facebook ID has authenticated
 * @param fbid
 */
function getFacebookID(fbid) {
    return new Promise(function(resolve, reject) {
        request({
            uri: config.authDynamoGetEndpoint,
            qs: {id: fbid},
            method: 'GET'

        }, function (error, response, body) {
            if(error) {
                console.error("Unable to send message.");
                console.error(response);
                console.error(error);
                resolve(false);
            }
            else {
                const responseData = JSON.parse(body);
                //console.log("~GET~ RESPONSE BODY: ", responseData);
                const isAuthenticated = responseData.data.authenticated;
                resolve(isAuthenticated);
            }
        });
    });
}

/**
 * Puts this facebook ID in the authentication table
 * @param fbid
 */
function putFacebookID(fbid) {
    return new Promise(function(resolve, reject) {
        request({
            uri: config.authDynamoGetEndpoint,
            qs: {id: fbid},
            method: 'POST'

        }, function (error, response, body) {
            if(error) {
                console.error("Unable to send message.");
                console.error(response);
                console.error(error);
                resolve();
            }
            else {
                //console.log("AUTHENTICATION ~POST~ RESPONSE");
                const responseData = JSON.parse(body);
                console.log("Response: ", responseData);
                resolve(responseData);
            }
        });
    });
}
