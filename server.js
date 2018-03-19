const html = __dirname + '/public';

const port = 10002;
const apiUrl = '/api';

// Express
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
var app = express();

app
    .use(compression())
    .use(bodyParser.json())
    // Static content
    //.use('/web',express.static(html))
    .use(express.static(html))
    .all('/*',function(req,res,next){
        res.sendFile('/public/rack/web/index.html',{root:__dirname})
    })
    // Start server
    .listen(port, function () {
        console.log('Port: ' + port);
        console.log('Html: ' + html);
    });
