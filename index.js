const express = require('./config.js')();
const functions = require('./requests.js');
const routes = require('./routes')(express, functions);

express.listen('8001', () => {
    console.log("Server rodando");
});