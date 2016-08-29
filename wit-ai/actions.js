'use strict';

const session = require('../sessions/sessions');
const Wit = require('node-wit').Wit;

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
    getSocial: getSocial
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
function send({sessionId, context}, {text}) {
    // find facebook id
    // send message
    console.log('Our bot wants to talk!');
    console.log('sessionId: ', sessionId);
    console.log('context: ', context);
    console.log('text: ', text);
}

function getPerson({sessionId, context, text, entities}) {
    console.log("get person");
    context.intent = firstEntityValue(entities, 'intent');
    context.keyword = firstEntityValue(entities, 'contact');

    // check context

    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    console.log(`Contact value `, firstEntityValue(entities, 'contact'));

    return Promise.resolve(context);
}

function getInfo({sessionId, context, text, entities}) {
    console.log("get info");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    return Promise.resolve(context);
}

function getTalk({sessionId, context, text, entities}) {
    console.log("get talk");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    return Promise.resolve(context);
}

function getTopic({sessionId, context, text, entities}) {
    console.log("get topic");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    return Promise.resolve(context);
}

function getSocial({sessionId, context, text, entities}) {
    console.log("get social");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    return Promise.resolve(context);
}


