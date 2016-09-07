'use strict';

const sessions = require('../sessions/sessions');
const witai = require('../wit-ai/wit-ai.js');
const config = require('../config/default.json');
const swearjar = require('swearjar');
const actions = require('../wit-ai/actions');
const api = require('../api/api');

module.exports = {
    receivedMessage: receivedMessage
};

/**
 * Handle message from a client
 * @param req
 * @param res
 */
function receivedMessage(req, res) {

    // Make sure the user message is not profane
    if(!swearjar.profane(req.body.message.text)) {
        // Work around for chatbot bug - check if the message is from the chatbot itself
        if(!(req.body.sender)) {
            console.log('WIT LAYER RECEIVES: ', req.body.message.text);
            witai.callWitAI(req, res);
        }
        else if(!(req.body.sender.id == config.chatbotFacebookId)) {
            console.log('WIT LAYER RECEIVES: ', req.body.message.text);
            console.log('FROM: ', req.body.sender.id);
            witai.callWitAI(req, res);
        }
    }
    else {
        // If the user was profane shame them!
        let query = {
            intent: "shame",
            detail: "",
            keyword: [],
            time: "",
            name: ""
        }
        var context = {};
        if(req.body.sender.id) {
            context.fbid = req.body.sender.id;
        }
        api.accessAPI(query)
            .then(function(data) {
                res.send(data);
            });
    }
}
