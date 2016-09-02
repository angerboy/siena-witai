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
    callWitAI: callWitAI,
    callWitAIWithRes: callWitAIWithRes
};

/**
 * Send current session and user entered text to Wit.Ai
 * @param facebookID
 * @param text
 */
function callWitAI(facebookID, text) {
    const session = sessions.findOrCreateSession(facebookID);
    session.context.fbid = facebookID;
    wit.runActions(
        session.id,
        text,
        session.context
    ).then((context) => {
        console.log('FINISHED WIT ACTIONS *************');
    })
        .catch((err) => {
            console.error('Oops! Got an error from Wit: ', err.stack || err);
        })
}

/**
 * Send the input to Wit.Ai. This input comes from the generic endpoint, not Messenger.
 * @param res
 * @param text
 */
function callWitAIWithRes(res, text) {
    var session = sessions.createSession();
    //session.context.res = res;
    wit.runActions(
        session.id,
        text,
        session.context
    ).then((context) => {
        //console.log('FINISHED WIT ACTIONS FOR CLIENT *************');
        res.send(context.query);
        api.accessAPI(context.query)
            .then(function(data) {
                res.send(data);
            });
    })
        .catch((err) => {
            console.error('Oops! Got an error from Wit: ', err.stack || err);
        })
}