var Scanner = require('../lib/Scanner').Scanner;

module.exports = {
    
    index: function (request, response, next) {

        response.render('test-generator/index', {
            pageTitle: 'Test Generator'
        });
    },

    runScan: function(request, response){
        
        let scanner = new Scanner();

        scanner.scanRemote().then(function(results){

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
                pageTitle: 'Scanner'
            });
        });
        
        // Look at each .ejs file

        // Look for <input> types
    },
}