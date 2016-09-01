'use strict';

const emoji = require('emojione');
const constants = require('../config/constants');

module.exports = {
    detectedEmoji: detectedEmoji,
    parseEmoji: parseEmoji,
    detectedGif: detectedGif,
    getAttachmentUrl: getAttachmentUrl
};

function detectedEmoji(text) {
    const decodedString = emoji.toShort(text);

    var colonCounts = decodedString.split(":").length - 1;
    if(colonCounts >= 2) {
        return true;
    }

    return false;
}

function parseEmoji(text) {
    const decodedString = emoji.toShort(text);
    const foodEmojis = constants.getFoodEmojis();
    console.log(decodedString);
    for(var idx in foodEmojis) {
        if(decodedString.includes(foodEmojis[idx])) {
            return "When is lunch?";
        }
    }

    if(decodedString.includes(":grinning:")) {
        return "thank you";
    }

    return text;
}

function detectedGif(message) {
    const url = getAttachmentUrl(message);
    return url.includes("gif");
}

function getAttachmentUrl(message) {
    if(message.type === "image") {
        if(message.payload) {
            return message.payload.url;
        }
    }

    return "";
}
