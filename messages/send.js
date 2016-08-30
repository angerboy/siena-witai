const config = require('../config/default.json');

function callSendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: config.fbPageAccessToken },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        analytics.getDashbot().logOutgoing(messageData, response.body);
        if(error) {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });
}