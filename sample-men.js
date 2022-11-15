var http = require('http');
var express = require('express');
var app = express();

(async () => {    

    // Connect to the MongoDB Server
    var MongoClient = require('mongodb').MongoClient;
    var db = await MongoClient.connect("mongodb://localhost:3001");
 
    // Create a web server
    http.createServer(app).listen(3000);

    // Listen for GET requests at http://localhost:3000
    app.get('/', async function(request, response){

        // Query a list of all users
        await db.db('sqli').collection('users').find().toArray(function(err, result) {

            if (err) throw err;
            
            // Display them to the web page.
            response.send(result);

        });

    });
})();