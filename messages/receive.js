'use strict';

const sessions = require('../sessions/sessions');
const witai = require('../wit-ai/wit-ai.js');
const config = require('../config/default.json');

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
    // Work around for chatbot bug - check if the message is from the chatbot itself
    if(!(req.body.sender.id == config.chatbotFacebookId)) {
        console.log('USER MESSAGE: ', req.body.message.text);
        console.log('FROM: ', req.body.sender.id);
        witai.callWitAI(req.body.sender.id, req.body.message.text);
    }
    res.sendStatus(200);
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

