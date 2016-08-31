'use strict';

const sessions = require('../sessions/sessions');
const witai = require('../wit-ai/wit-ai.js');
const config = require('../config/default.json');
const swearjar = require('swearjar');
const actions = require('../wit-ai/actions');

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
    // Check if the user sent a postback
    if(req.body.postback) {
        witai.callWitAI(req.body.sender.id, req.body.postback.payload);
    }
    // Make sure the user message is not profane
    else if(!swearjar.profane(req.body.message.text)) {
        // Work around for chatbot bug - check if the message is from the chatbot itself
        if(!(req.body.sender.id == config.chatbotFacebookId)) {
            console.log('USER MESSAGE: ', req.body.message.text);
            console.log('FROM: ', req.body.sender.id);
            witai.callWitAI(req.body.sender.id, req.body.message.text);
        }
    }
    else {
        // If the user was profane shame them!
        let query = {
            intent: "shame",
            detail: "none",
            keyword: [],
            time: "",
            name: ""
        }
        var context = {};
        context.fbid = req.body.sender.id;
        actions.callSiena(query, context);
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

