'use strict';

const Wit = require('node-wit').Wit;
const log = require('node-wit').log;
const sessions = require('../sessions/sessions');
const config = require('../config/default.json');
const actions = require('./actions').getActions();
const api = require('../api/api');
const auth = require('../auth/authenticate');

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
function callWitAI(req, res) {

    var session;

    // Handle session context only for facebook users
    if(req.body.sender) {
        session = sessions.findOrCreateSession(req.body.sender.id);
        session.context.fbid = req.body.sender.id; // Do we need this????
    }
    else {
        session = sessions.createSession();
    }

    var text;

    // Check for postback from user
    if(req.body.postback) {
        text = req.body.postback.payload;
    }
    else {
        text = req.body.message.text;
    }

    wit.runActions(
        session.id,
        text,
        session.context
    ).then((context) => {
        console.log('FINISHED WIT ACTIONS *************');
        if(context.query.intent === ""){
            console.log("clarify");
            context.query.intent = "clarify";
        }
        //check for Facebook users
        if(req.body.sender) {
            api.accessAPI(context.query)
                .then(function(data) {
                    res.send(data);
                });
            // check if user has authenticated
            // auth.getFacebookID(req.body.sender.id).then(function(isAuthenticated) {
            //     isAuthenticated = true;
            //     if(!isAuthenticated) {
            //         console.log("not authenticated");
            //         context.query.intent = "authenticate";
            //     }
            //     else {
            //         console.log("authenticated");
            //     }
            //     api.accessAPI(context.query)
            //         .then(function(data) {
            //             res.send(data);
            //         });
            // }, function(err) {
            //     context.query.intent = "authenticate";
            //     api.accessAPI(context.query)
            //         .then(function(data) {
            //             res.send(data);
            //         });
            // });
        }
        else {
            api.accessAPI(context.query)
                .then(function(data) {
                    res.send(data);
                });
        }
    })
        .catch((err) => {
            console.error('Oops! Got an error from Wit: ', err.stack || err);
        })
}