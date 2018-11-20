
function createExpress() {
    let express = require('express');
    let bodyParser = require('body-parser');
    let app = express();
    app.use(bodyParser.urlencoded({extended : true}));
    return app;
}


module.exports = createExpress;