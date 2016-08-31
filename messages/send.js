const config = require('../config/default.json');
const request = require('request');

module.exports = {
    sendResponseToChatbot: sendResponseToChatbot,
    sendTextMessage: sendTextMessage,
    sendCardMessage: sendCardMessage,
    buildChatbotResponseFromSienaResponse: buildChatbotResponseFromSienaResponse
}

function sendResponseToChatbot(messageData) {
    console.log("SENDING TO CHATBOT: ", messageData.message.text);
    request({
        uri: config.chatbotLayerEndpoint,
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        //analytics.getDashbot().logOutgoing(messageData, response.body);
        if(error) {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });
}

function buildChatbotResponseFromSienaResponse(data, context) {
    const response = data.data || {};
    const responseText = response.chatbotText || response.displayText || "";
    const cards = response.cards;
    console.log("RESPONSE TEXT: ", responseText);
    console.log("RESPONSE CARDS: ", cards);
    console.log(cards);
    if(cards) {
        sendCardMessage(context.fbid, cards);
    }
    sendTextMessage(context.fbid, responseText);
}

function sendTextMessage(recipientId, messageText) {
    let messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };

    sendResponseToChatbot(messageData);
}

function sendCardMessage(fbid, cards) {
    let messageData = {
        recipient: {
            id: fbid
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: generateCards(cards)
                }
            }
        }
    };
    sendResponseToChatbot(messageData);
}

/**
 *
 * Utility Functions
 *
 */

function generateCards(cardData) {
    cardData.forEach(function(data) {
        data.item_url = "";
        data.buttons = generateButtons(data.buttons);
    });
    return cardData;
}

function generateButtons(buttonData) {
    let buttons = [];
    buttonData.forEach(function(data) {
        let button = {};
        button.title = data.title;
        button.type = data.type;
        if(button.type === "web_url") {
            button.url = data.payload;
        } else {
            button.payload = data.payload;
        }
        buttons.push(button);
    });

    return buttons;
}