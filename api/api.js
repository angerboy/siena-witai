'use strict';

const request = require('request');
const swagger = require('swagger-client');
const config = require('../config/default.json');

module.exports = {
    accessAPI: accessAPI
};

function accessAPI(data) {
    const responseType = {
        responseContentType: 'application/json'
    };
    return new Promise(function(resolve, reject) {
        var client = new swagger({
            url: config.sienaAILayerEndpoint,
            success: function() {
                client.default.get_siena(data,responseType,function(response){
                    resolve(response.obj);
                }, function(err) {
                    reject(err);
                });
            }
        });
    });
}
