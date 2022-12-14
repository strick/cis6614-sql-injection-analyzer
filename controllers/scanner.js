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
                targetInputs: config.testApp.routes.login.targetInputs,
                successContent: config.testApp.routes.login.successContent
            }
        });
    },

    runScan: function(request, response){
        
        let scanner = new Scanner();

        scanner.scanRemote(request.body).then(function(results){
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
                    successContent: request.body.successContent,
                    targetInputs: request.body.targetInputs
                }
            });
        })
        .catch(function(e){
            console.log("Error: " + e);
            response.render('scanner/index', {
                results: [],
                successes: [],
                failures: [],
                pageTitle: 'Scanner - Bad URL Request',
                defaultConfigOptions: {
                    url: request.body.url,
                    successContent: request.body.successContent,
                    targetInputs: request.body.targetInputs
                }
            });
        });
        
        // Look at each .ejs file

        // Look for <input> types
    },
}