'use strict';

const session = require('../sessions/sessions');
const api = require('../api/api');
const actionUtils = require('../utils/wit-utils');
const sendModule = require('../messages/send');

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
    getJoke: getJoke
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
    // find facebook id
    // send message
    console.log('Our bot wants to talk!');
    // console.log(request);
    // console.log(response);

    return new Promise(function(resolve, reject) {
        // console.log('user said...', request.text);
        // console.log('sending...', JSON.stringify(response));
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
    callSiena(witResponse, context);
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
    callSiena(witResponse, context);

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
    if(detail) {
        context.detail = detail;
    }
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    callSiena(witResponse, context);
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
    if(detail) {
        context.detail = detail;
        const witResponse = actionUtils.generateSienaAIQuery(entities, context);
        callSiena(witResponse, context);
    }
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
    //console.log(`Session ${sessionId} received ${text}`);
    //console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const detail = firstEntityValue(entities, 'detail');
    const socialEvent = firstEntityValue(entities, 'socialEvent');
    if(detail) {
        context.detail = detail;
    }
    if(socialEvent) {
        context.keyword = socialEvent;
    }
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    callSiena(witResponse, context);
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

    const demo_type = firstEntityValue(entities, 'demo_type');
    if(demo_type) {
        context.keyword = demo_type;
        const witResponse = actionUtils.generateSienaAIQuery(entities, context);
        callSiena(witResponse, context);
    }
    else if(entities.keyword) {
        const witResponse = actionUtils.generateSienaAIQuery(entities, context);
        callSiena(witResponse, context);
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
    callSiena(witResponse, context);
    return Promise.resolve(context);
}

/**
 * Handlles the getJoke intent
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
    callSiena(witResponse, context);
    return Promise.resolve(context);
}

/**
 *  Utility functions
 */

/**
 * make the call to Siena
 * @param query
 */
function callSiena(query, context) {
    api.accessAPI(query)
        .then(function(data) {
            sendModule.buildChatbotResponseFromSienaResponse(data, context);
        });
}


