'use strict';

const Wit = require('node-wit').Wit;
const log = require('node-wit').log;
const sessions = require('../sessions/sessions');
const config = require('../config/default.json');
const actions = require('./actions').getActions();

const wit = new Wit({
    accessToken: config.witAccessToken,
    actions,
    logger: new log.Logger(log.INFO)
});

module.exports = {
    callWitAI: callWitAI
};

/**
 * Send current session and user entered text to Wit.Ai
 * @param facebookID
 * @param text
 */
function callWitAI(facebookID, text) {
    const session = sessions.findOrCreateSession(facebookID);
    wit.runActions(
        session.id,
        text,
        session.context
    ).then((context) => {
        console.log('Waiting for next user messages...');
        console.log(context);
        session.context = context;
        sessions.setSession(context);
    })
        .catch((err) => {
            console.error('Oops! Got an error from Wit: ', err.stack || err);
        })
}