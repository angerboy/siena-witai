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
    console.log("get facebook id");
    request({
        uri: config.authDynamoGetEndpoint,
        qs: {id: fbid},
        method: 'GET'

    }, function (error, response, body) {
        if(error) {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
        else {
            console.log("AUTHENTICATION GET RESPONSE");
            console.log(response);
            console.log(body);
        }
    });
}

/**
 * Puts this facebook ID in the authentication table
 * @param fbid
 */
function putFacebookID(fbid) {
    request({
        uri: config.authDynamoGetEndpoint,
        qs: {id: fbid},
        method: 'POST'

    }, function (error, response, body) {
        if(error) {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
        else {
            console.log("AUTHENTICATION POST RESPONSE");
            console.log(response);
            console.log(body);
        }
    });
}
