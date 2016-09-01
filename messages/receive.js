'use strict';

const sessions = require('../sessions/sessions');
const witai = require('../wit-ai/wit-ai.js');
const config = require('../config/default.json');
const swearjar = require('swearjar');
const actions = require('../wit-ai/actions');
//const inputUtils = require('../utils/input-utils');

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

            // const messageText = req.body.message.text;
            // const messageAttachments = req.body.message.attachments;

            // if (messageText) {
            //     if(inputUtils.detectedEmoji(messageText)) {
            //         const newMessageText = inputUtils.parseEmoji(messageText);
            //         wit.callWitAI(senderID, newMessageText);
            //     } else {
            //         wit.callWitAI(senderID, messageText);
            //     }
            // } else if (messageAttachments) {
            //     if(inputUtils.detectedGif(messageAttachments[0])) {
            //         send.sendImageMessage(senderID, constants.getGif());
            //     } else {
            //         send.sendTextMessage(senderID, "Two can play that game!");
            //         send.sendImageMessage(senderID, inputUtils.getAttachmentUrl(messageAttachments[0]));
            //     }
            //     console.log(messageAttachments);
            // }

            witai.callWitAI(req.body.sender.id, req.body.message.text);
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

