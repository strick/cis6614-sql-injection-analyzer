var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(request, response){
    response.render('index');
});

app.post('/', function(request, response){

    console.log(request.body);
    response.render('index');
    
});

http.createServer(app).listen(3000);