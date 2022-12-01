const config = require('../config');
const Scanner = require('../lib/Scanner').Scanner;


function runScan(body) {
        
    let scanner = new Scanner();

    return scanner.scanRemote(body).then(function(results){

        // Tally the successes
        successes = [];

        for(let i = 0; i<results.length; i++){

            if(results[i].success){
                successes.push(results[i].fuzz);
            }
        }

        return successes;
    });

}

module.exports = {
    
    index: function (request, response, next) {

        response.render('test-generator/index', {
            pageTitle: 'Test Generator',
            success: [],
            jasmineTests: [],
            showNoTests: false,
            defaultConfigOptions: {
                url: config.testApp['app-url'] + config.testApp.routes.login.url,
                targetInputs: config.testApp.routes.login.targetInputs,
                successContent: config.testApp.routes.login.successContent
            }
        });

    },

    run: function (request, response, next) {

        let attackRoute = request.body.url;
        let successContent = request.body.successContent;

        // Run the scan adn get which tests failed
        runScan(request.body).then(function(successfulAttacks){

            console.log(successfulAttacks);

            // Build a Jasmine test for each failed one
            let jasmineTests = [];
            
            for(let i=0; i<successfulAttacks.length; i++){
                
                jasmineTests.push(
                `
describe('${attackRoute} controller requests', () => {
    it('should not contain successful content when NoSQL Injection ${successfulAttacks[i]} is used', 
        async () => {
            const res = await request(app)
                .get('${attackRoute}')
                .expect(200)
                .expect(function(res){
                    if(res.text.includes("${successContent}")) {
                        throw new Error("NoSQL Injection vulnerability found!");
                    }
                });
        }
    );
});` 
                );
            }    
            
            response.render('test-generator/index', {
                pageTitle: 'Test Generator',
                success: successfulAttacks,
                jasmineTests: jasmineTests,
                showNoTests: true,
                defaultConfigOptions: {
                    url: request.body.url,
                    successContent: request.body.successContent,
                    targetInputs: request.body.targetInputs
                }
           });

        })
        .catch(function(e){
            console.log("Error: " + e);
            response.render('test-generator/index', {
                pageTitle: 'Test Generator - Bad URL Requested',
                success: [],
                jasmineTests: [],
                showNoTests: true,
                defaultConfigOptions: {
                    url: request.body.url,
                    successContent: request.body.successContent,
                    targetInputs: request.body.targetInputs
                }
           });
        });
        
    }
}