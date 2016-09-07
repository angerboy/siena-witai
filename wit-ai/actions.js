'use strict';

const session = require('../sessions/sessions');
const api = require('../api/api');
const actionUtils = require('../utils/wit-utils');
const firebase = require('../firebase/firebase');
const auth = require('../auth/authenticate');
const facebook = require('../facebook/facebook');

const firstEntityValue = (entities, entity) => {
    const val = entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].value;
    if (!val) {
        return null;
    }
    return typeof val === 'object' ? val.value : val;
};

const actions = {
    send: send,
    getPerson: getPerson,
    getInfo: getInfo,
    getTalk: getTalk,
    getTopic: getTopic,
    getSocial: getSocial,
    getDemo: getDemo,
    getGreeting: getGreeting,
    getJoke: getJoke,
    getLocate: getLocate,
    getDashboard: getDashboard,
    getPin: getPin,
    getEvent: getEvent,
    getGif: getGif,
    getHelp: getHelp,
    getThanks: getThanks,
    getAuthenticate: getAuthenticate,
    getCompany: getCompany
}

module.exports = {
    getActions: getActions
};

function getActions() {
    return actions;
}

/**
 * Our bot has something to say
 * @param sessionId
 * @param context
 * @param text
 */
function send(request, response) {
    console.log('IN SEND ~~~~');
    return new Promise(function(resolve, reject) {
        console.log('user said...', request.text);
        console.log('sending...', JSON.stringify(response));
        return resolve();
    });
}

/**
 * Handles the getPerson intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 * @returns {Promise.<*>}
 */
function getPerson({sessionId, context, text, entities}) {
    console.log("get person");
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const contact = firstEntityValue(entities, 'contact');
    if(contact) {
        context.name = contact;
    }
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    context.query = witResponse;
    return Promise.resolve(context);
}

/**
 * Handles the getInfo intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 * @returns {Promise.<*>}
 */
function getInfo({sessionId, context, text, entities}) {
    console.log("get info");
    console.log(`Wit extracted ${JSON.stringify(entities)}`);

    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    context.query = witResponse;
    return Promise.resolve(context);
}

/**
 * Handles getTalk intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 * @returns {Promise.<*>}
 */
function getTalk({sessionId, context, text, entities}) {
    console.log("get talk");
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const detail = firstEntityValue(entities, 'detail');
    const contact = firstEntityValue(entities, 'contact');
    const time = firstEntityValue(entities, 'datetime');
    if(detail) {
        context.detail = detail;
    }
    if(contact) {
        context.name = contact;
    }
    if(time) {
        context.time = time;
    }
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    context.query = witResponse;
    return Promise.resolve(context);
}

/**
 * Handles getTopic intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 * @returns {Promise.<*>}
 */
function getTopic({sessionId, context, text, entities}) {
    console.log("get topic");
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const detail = firstEntityValue(entities, 'detail');
    const time = firstEntityValue(entities, 'datetime');
    if(detail) {
        context.detail = detail;
    }
    if(time) {
        context.time = time;
    }
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    context.query = witResponse;
    return Promise.resolve(context);
}

/**
 * Handles getSocial intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 * @returns {Promise.<*>}
 */
function getSocial({sessionId, context, text, entities}) {
    console.log("get social");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const detail = firstEntityValue(entities, 'detail');
    const socialEvent = firstEntityValue(entities, 'socialEvent');
    const time = firstEntityValue(entities, 'datetime');
    if(detail) {
        context.detail = detail;
    }
    if(socialEvent) {
        context.keyword = socialEvent;
    }
    if(time) {
        context.time = time;
    }
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    context.query = witResponse;
    return Promise.resolve(context);
}

/**
 * Handles getDemo intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 * @returns {Promise.<*>}
 */
function getDemo({sessionId, context, text, entities}) {
    console.log("get demo");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);

    if(entities.keyword) {
        const witResponse = actionUtils.generateSienaAIQuery(entities, context);
        context.query = witResponse;
    }
    else {
        let query = {
            intent: "demo",
            detail: "all",
            keyword: [],
            time: "",
            name: ""
        }
        context.query = query;
    }
    return Promise.resolve(context);
}

/**
 * Handles the getGreeting intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getGreeting({sessionId, context, text, entities}) {
    console.log("get greeting");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    context.query = witResponse;
    return Promise.resolve(context);
}

/**
 * Handles the getJoke intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getJoke({sessionId, context, text, entities}) {
    console.log("get joke");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    context.query = witResponse;
    return Promise.resolve(context);
}

/**
 * Handles the locate intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getLocate({sessionId, context, text, entities}) {
    console.log("get locate");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);

    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    context.query = witResponse;
    return Promise.resolve(context);
}

/**
 * Handles the get dashboard intent. Send user to the dashboard
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getDashboard({sessionId, context, text, entities}) {
    console.log("get dashboard");
    firebase.pushUserInNeed(context.fbid);
    return Promise.resolve(context);
}

/**
 * Handles the get pin intent. This will kick off the networking flow
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getPin({sessionId, context, text, entities}) {
    console.log("get pin");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const pin = firstEntityValue(entities, 'number');
    if(pin) {
        //send to authentication table
        console.log("we received a pin")
        context.keyword = pin;
        auth.putFacebookID(context.fbid).then(function(data) {
            facebook.getName(context.fbid).then(function(name) {
                context.name = name;
                var witResponse = actionUtils.generateSienaAIQuery(entities, context);
                context.query = witResponse;
                return Promise.resolve(context);
            }, function(err) {
                // TODO: if can't retrieve fb name do something
                console.log("FACEBOOK ERROR: ", err);
                var witResponse = actionUtils.generateSienaAIQuery(entities, context);
                context.query = witResponse;
                return Promise.resolve(context);
            });
            var witResponse = actionUtils.generateSienaAIQuery(entities, context);
            context.query = witResponse;
            return Promise.resolve(context);
        }, function(err) { // TODO: if can't put facebook id in authentication table do something
            console.log(err);
            var witResponse = actionUtils.generateSienaAIQuery(entities, context);
            context.query = witResponse;
            return Promise.resolve(context);
        });
    } else {
        var witResponse = actionUtils.generateSienaAIQuery(entities, context);
        context.query = witResponse;
        return Promise.resolve(context);
    }
    return Promise.resolve(context);
}

/**
 * Handles the get Event intent. This is a callback if wit misses get Social or get Talk
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getEvent({sessionId, context, text, entities}) {
    console.log("get event");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);

    const detail = firstEntityValue(entities, 'detail');
    const time = firstEntityValue(entities, 'datetime');
    if(detail) {
        context.detail = detail;
    }
    if(time) {
        context.time = time;
    }

    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    context.query = witResponse;
    return Promise.resolve(context);
}


/**
 * Handle get gif intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getGif({sessionId, context, text, entities}) {
    console.log("get gif");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    return Promise.resolve(context);
}

/**
 * Handles the get help intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getHelp({sessionId, context, text, entities}) {
    console.log("get help");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    let query = {
        intent: "help",
        detail: "",
        keyword: [],
        time: "",
        name: ""
    };
    context.query = query;
    return Promise.resolve(context);
}

/**
 * Handles the get thanks intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getThanks({sessionId, context, text, entities}) {
    console.log("get thanks");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const query = actionUtils.generateSienaAIQuery(entities,context);
    context.query = query;
    return Promise.resolve(context);
}

/**
 * Handles the authentication intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 * @returns {Promise.<*>}
 */
function getAuthenticate({sessionId, context, text, entities}) {
    console.log("get authenticate");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const query = actionUtils.generateSienaAIQuery(entities,context);
    context.query = query;
    return Promise.resolve(context);
}

function getCompany({sessionId, context, text, entities}) {
    console.log("get company");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const query = actionUtils.generateSienaAIQuery(entities,context);
    context.query = query;
    return Promise.resolve(context);
}



