var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var inputGenerator = require('./input-generator');

var db = require('./db');

var app = express();
db.connect(app);

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.on('db-ready', function(){
    console.log("DB is connected");
});
  
  
app.get('/', function(request, response){
    response.render('index', {
        sql: inputGenerator.inputGenerator()
    });
});

app.post('/', function(request, response){

    console.log(request.body);
    response.render('index');
    
});


http.createServer(app).listen(3000);