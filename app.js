var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var inputGenerator = require('./input-generator');

var app = express();

// Establish connection to MongoDb server.
var dbo = null;
const db = require('./db').DbConnector;
(async () => {    
    dbo = await db.open(app);
})();

app.on('db-ready', function(my){
    console.log("DB is connected");
    
    http.createServer(app).listen(3000);
    console.log("Server is up");

});

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

var attackVectorTesterRouter = require('./routes/attack-vector-tester');
var scannerRouter = require('./routes/scanner');

app.use('/scanner', scannerRouter);
app.use('/attack-vector-tester', attackVectorTesterRouter);
  
app.get('/', function(request, response){
    response.render('index', {
        sql: inputGenerator.inputGenerator(),
        query: '',
        success: true
    });
});