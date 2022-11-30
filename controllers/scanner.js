var Scanner = require('../lib/Scanner').Scanner;
var config = require("../config");

module.exports = {
    
    index: function (request, response, next) {

        response.render('scanner/index', {
            pageTitle: 'Scanner',
            successes: [],
            failures: [],
            defaultConfigOptions: {
                url: config.testApp['app-url'] + config.testApp.routes.login.url,
                successContent: config.testApp.routes.login.successContent
            }
        });
    },

    runScan: function(request, response){
        
        let scanner = new Scanner();

        scanner.scanRemote().then(function(results){
            console.log("results: ");
            console.log(results);
        
            // Tally the failures and successes
            successes = [];
            failures = [];

            for(let i = 0; i<results.length; i++){

                if(results[i].success){
                    successes.push(results[i].fuzz);
                }
                else {
                    failures.push(results[i].fuzz);
                }
            }
            response.render('scanner/index', {
                results: results,
                successes: successes,
                failures: failures,
                pageTitle: 'Scanner',
                defaultConfigOptions: {
                    url: request.body.url,
                    successContent: request.body.successContent
                }
            });
        });
        
        // Look at each .ejs file

        // Look for <input> types
    },
}