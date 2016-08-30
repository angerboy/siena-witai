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
    getDemo: getDemo
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
        console.log('user said...', request.text);
        console.log('sending...', JSON.stringify(response));
        return resolve();
    });
}

function getPerson({sessionId, context, text, entities}) {
    console.log("get person");
    // check context

    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    console.log(`Contact value `, firstEntityValue(entities, 'contact'));
    const contact = firstEntityValue(entities, 'contact');
    if(contact) {
        context.name = contact;
    }
    const witResponse = actionUtils.generateSienaAIQuery(entities, 'person', context);
    callSiena(witResponse, context);
    return Promise.resolve(context);
}

function getInfo({sessionId, context, text, entities}) {
     console.log("get info");
    // console.log(`Session ${sessionId} received ${text}`);
    // console.log(`The current context is ${JSON.stringify(context)}`);
    // console.log(`Wit extracted ${JSON.stringify(entities)}`);
    // return Promise.resolve(context);
    // return new Promise(function(resolve, reject) {
    //     const keyword = firstEntityValue(entities, 'keyword');
    //     const intent = firstEntityValue(entities, 'intent');
    //     const detail = firstEntityValue(entities, 'detail');
    //     if(keyword) {
    //         context.keyword = keyword;
    //     }
    //     if(intent) {
    //         context.intent = intent;
    //     }
    //     if(detail) {
    //         context.detail = detail;
    //     }
    //     return resolve(context);
    // })
    const keyword = firstEntityValue(entities, 'keyword');
    if(keyword) {
        context.keyword = keyword;
        const witResponse = actionUtils.generateSienaAIQuery(entities, 'info', context);
        callSiena(witResponse, context);
    }
}

function getTalk({sessionId, context, text, entities}) {
    console.log("get talk");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const detail = firstEntityValue(entities, 'detail');
    const keyword = firstEntityValue(entities, 'keyword');
    if(detail) {
        context.detail = detail;
    }
    const witResponse = actionUtils.generateSienaAIQuery(entities, 'talk', context);
    callSiena(witResponse, context);
    return Promise.resolve(context);
}

function getTopic({sessionId, context, text, entities}) {
    console.log("get topic");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const detail = firstEntityValue(entities, 'detail');
    if(detail) {
        context.detail = detail;
        const witResponse = actionUtils.generateSienaAIQuery(entities, 'topic', context);
        callSiena(witResponse, context);
    }
    return Promise.resolve(context);
}

function getSocial({sessionId, context, text, entities}) {
    console.log("get social");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const detail = firstEntityValue(entities, 'detail');
    const socialEvent = firstEntityValue(entities, 'socialEvent');
    if(detail) {
        context.detail = detail;
    }
    if(socialEvent) {
        context.socialEvent = socialEvent;
    }
    return Promise.resolve(context);
}

function getDemo({sessionId, context, text, entities}) {
    console.log("get demo");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
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


