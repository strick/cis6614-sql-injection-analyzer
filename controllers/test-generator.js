const config = require('../config');
const Scanner = require('../lib/Scanner').Scanner;

let attackRoute = config.testApp.routes.login.url;
let successContent = config.testApp.routes.login.successContent;

function runScan() {
        
    let scanner = new Scanner();

    return scanner.scanRemote().then(function(results){

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

        // Run the scan adn get which tests failed
        runScan().then(function(successfulAttacks){

            console.log(successfulAttacks);

            // Build a Jasmine test for each failed one
            let jasmineTests = [];
            
            for(let i=0; i<successfulAttacks.length; i++){
                
                jasmineTests.push(
                `
describe('${attackRoute} controller requests', () => {
    it('should not contain successful content when NoSQL Injection ${successfulAttacks[i]} is used', async () => {
        const res = await request(app)
            .get('${attackRoute}')
            .expect(200)
            .expect(function(res){
                if(res.text.includes("${successContent}")) throw new Error("NoSQL Injection vulnerability found!");
            });
    });
});` 
                );
            }    
            
            response.render('test-generator/index', {
                pageTitle: 'Test Generator',
                success: successfulAttacks,
                jasmineTests: jasmineTests
           });

        });
    }
}