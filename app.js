var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

var app = express();

// Establish connection to MongoDb server.
var dbo = null;
const db = require('./db').DbConnector;
(async () => {    
    dbo = await db.open(app);
})();

app.on('db-ready', function(my){
    console.log("DB is connected");
    
    http.createServer(app).listen(process.env.PORT || 3000);
    console.log("Server is up");

});

app.use(expressLayouts);
app.set('layout', 'layout');
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

var attackVectorTesterRouter = require('./routes/attack-vector-tester');
var scannerRouter = require('./routes/scanner');
var testGeneratorRouter = require('./routes/test-generator');

app.use('/scanner', scannerRouter);
app.use('/attack-vector-tester', attackVectorTesterRouter);
app.use('/test-generator', testGeneratorRouter);

app.get('/', function(request, response){
    response.render('index', {
        query: '',
        pageTitle: 'Home',
        success: true
    });
});