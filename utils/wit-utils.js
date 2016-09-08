'use strict';

module.exports = {
    generateSienaAIQuery:generateSienaAIQuery,
    replaceKeywordWithFacebookId: replaceKeywordWithFacebookId
};

function generateSienaAIQuery(entities, context) {
    console.log("CONTEXT TO PASS: ", context);
    let data = {
        intent: "",
        detail: "",
        keyword: [],
        time: "",
        name: ""
    };
    if(entities.intent) {
        data.intent = entities.intent[0].value.toLowerCase();
    }
    else {
        data.intent = "clarify";
    }
    if(context.name) {
        data.name = context.name.toLowerCase();
    }
    if(context.detail) {
        data.detail = context.detail.toLowerCase();
    }
    if(context.time) {
        const date = new Date(context.time);
        data.time = date.getTime();
    }
    if(entities.keyword) {
        console.log(entities.keyword);
        entities.keyword.forEach(function(keyword) {
            data.keyword.push(keyword.value.toLowerCase());
        });
    }
    if(context.keyword) {
        data.keyword.push(context.keyword);
    }

    return data;
}

function replaceKeywordWithFacebookId(query, fbid) {
    if(query.keyword.indexOf("sendemail") > -1) {
        query.keyword = [fbid];
        return query;
    }
    return query;
}
