const express = require('./config/config.js')();
const functions = require('./routes/requests.js');
const routes = require('./routes/routes.js')(express, functions);

express.listen('8001', () => {
    console.log("Server rodando");
});