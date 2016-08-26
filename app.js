'use strict';

const express = require('express');
const receive = require('./messages/receive');
const bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/analyze', receive.receivedMessageFromMessenger);

app.listen(app.get('port'), function () {
    console.log('Node app listening on port ', app.get('port'));
});