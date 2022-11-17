var Scanner = require('../lib/Scanner').Scanner;

module.exports = {
    
    index: function (request, response, next) {

        response.render('scanner/index', {

        });
    },

    runScan: function(request, response){

        
        let scanner = new Scanner();
        scanner.findAttackVectors();
        
        response.render('scanner/index', {

        });
        
        // Look at each .ejs file

        // Look for <input> types
    },
}