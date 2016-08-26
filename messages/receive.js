'use strict';

const sessions = require('../sessions/sessions');

module.exports = {
    receivedMessageFromMessenger: receivedMessageFromMessenger
};

function receivedMessageFromMessenger(req, res) {
    console.log("received message from bot");
    // retrieve context from Dynamo, or create new
    console.log(req.body.sender.id);
    var session = sessions.findOrCreateSession(req.body.sender.id);
    // send text to wit
    console.log(session.id);
    console.log(session.fbid);
    console.log(session.context);

}
