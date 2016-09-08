'use strict';
var request = require('request-promise');
const config = require('../config/default.json');

module.exports = {
    insertFacebookId:insertFacebookId
}

var options = {
    json: true
};

function insertFacebookId(fbid, pin) {
    options.headers = {
        'x-api-key': config.IDLS_ID_API_KEY
    };
    return new Promise(function(resolve, reject) {
        options.uri = config.IDLS_ID_URI + `/${pin}`;
        options.method = 'PUT';
        options.body = {
            "facebookID": fbid.toString()
        }
        request(options).then(function (data) {
            if (data) {
                console.log("Person: ", JSON.stringify(data));
                resolve(data);
            } else {
                console.log("IDLS didn't find a person by ID");
                reject();
            }
        }).catch(function (err) {
            console.log("IDLS personByID error: ", err);
            reject();
        });
    });
}
