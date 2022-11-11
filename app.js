var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var inputGenerator = require('./input-generator');

var app = express();

// Establish connection to MongoDb server.
var db = new (require('./db').DbConnector);
var dbo = null;
async function getDbConnection() {
    dbo = await db.connect(app);
}

getDbConnection();
 

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.on('db-ready', function(my){
    console.log("DB is connected");
    
    http.createServer(app).listen(3000);
    console.log("Server is up");
});
  
  
app.get('/', function(request, response){
    response.render('index', {
        sql: inputGenerator.inputGenerator()
    });
});

// Assuming that the user is looking for a single row and parses the JSON request
// You are able to inject something such as { "$gt": "" } to recieve the first record
// i.e. a login attack  Ref: https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb
app.post('/attackOne', function(request, response){

    console.log(request.body);
    response.render('index', {
        sql: inputGenerator.inputGenerator()
    });

    var payload = request.body.test;
    try{
        payload = JSON.parse(payload);
    }
    catch(e){

    }

    //var query = { $where: function() { return this.username = "brian" }};//'{ $where: function() { return username = ' + request.body.test + '}};'//0;var date=new Date(); do{curDate = new Date();}while(curDate-date<10000)'};
    //dbo.collection('users').find({"$where": "function(){ return this.username = '" + request.body.test + "';}" }).toArray(function(err, result) {
    dbo.collection('users').findOne({"username": payload}, function(err, result) {
        if (err) throw err;
        console.log(result);
    });

});

