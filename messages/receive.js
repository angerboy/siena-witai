'use strict';

const sessions = require('../sessions/sessions');
const witai = require('../wit-ai/wit-ai.js');

module.exports = {
    receivedMessageFromMessenger: receivedMessageFromMessenger,
    receivedPostbackFromMessenger: receivedPostbackFromMessenger
};

/**
 * handle message from user
 * @param req
 * @param res
 */
function receivedMessageFromMessenger(req, res) {
    console.log("received message from bot");
    // retrieve context from Dynamo, or create new
    console.log('event: ', req.body);
    //var session = sessions.findOrCreateSession(req.body.sender.id);

    //call wit
    witai.callWitAI(req.body.sender.id, req.body.message.text);
}

/**
 * handle postback from user
 * @param req
 * @param res
 */
function receivedPostbackFromMessenger(req, res) {
    console.log('received postback from bot');
    console.log('event payload: ', req.body.postback.payload);
}

