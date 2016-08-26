'use strict';

module.exports = {
    receivedMessageFromMessenger: receivedMessageFromMessenger
};

function receivedMessageFromMessenger(req, res) {
    console.log("received message from bot");
    console.log(req.headers);
    // retrieve context from Dynamo, or create new
    // send text to wit
}
