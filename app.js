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

app.post('/', function(request, response){

    console.log(request.body);
    response.render('index', {
        sql: inputGenerator.inputGenerator()
    });

    var query = { username: "brian" };

    dbo.collection('users').find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
    
});
