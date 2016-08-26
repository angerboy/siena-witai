'use strict';

module.exports = {
    findOrCreateSession: findOrCreateSession,
    setSession: setSession
};


/**
 * Find the current session in DynamoDB or create one if none exist
 * @param facebookID
 * @returns the current session
 */
function findOrCreateSession(facebookID) {
    console.log("hello from find or create session");
    let session = null;
    // look for current session in Dynamo

    // if session is null, build a new one
    if(!session) {
        //create new sessionId
        session = {};
        var sessionId = new Date().toISOString();
        session.id = sessionId;
        session.fbid = facebookID;
        session.context = {};
    }

    return session;
}

/**
 * Sets/updates session in DynamoDB
 */
function setSession(session) {
    // send session to Dynamo
}

