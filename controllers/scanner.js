var Scanner = require('../lib/Scanner').Scanner;

module.exports = {
    
    index: function (request, response, next) {

        response.render('scanner/index', {
            pageTitle: 'Scanner'
        });
    },

    runScan: function(request, response){

        
        let scanner = new Scanner();
        console.log("running)");

        scanner.scanRemote().then(function(results){
            console.log("results: ");
            console.log(results);
        
            response.render('scanner/index', {
                results: results,
                pageTitle: 'Scanner'
            });
        });
        
        // Look at each .ejs file

        // Look for <input> types
    },
}