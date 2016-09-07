'use strict';

const FB = require('fb');
const config = require('../config/default.json');

module.exports = {
    getName:getName
}

/**
 * Get Facebook name from Facebook ID
 * @param fbid
 */
function getName(fbid) {
    return new Promise(function(resolve, reject) {
        FB.api(fbid, {
            client_id: config.fbAppId,
            client_secret: config.fbAppSecret,
            access_token: config.fbPageAccessToken
        }, function (res) {
            if(!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                resolve();
            }
            else {
                var name = res.first_name + ' ' + res.last_name;
                console.log("Facebook Name: ", name);
                resolve(name);
            }
        });
    })
}