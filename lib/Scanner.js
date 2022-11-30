//const fs = require('fs');
//var htmlparser = require("htmlparser");
//const { send } = require('process');
//var select = require('soupselect').select;
var config = require('../config');

class Scanner {

    scanRemote(body){
        
        let fuzzTests = config.fuzzTests;        
        let url = body.url;
        let successContent = body.successContent;

        let results = [];
        // Fuzz Test!
        for(let i=0; i<fuzzTests.length; i++){
            console.log("Running test: " + fuzzTests[i] + " on " + url);
            results.push(this.sendScan(fuzzTests[i], url, successContent));
        }
        return Promise.all(results);

    }

    sendScan(fuzz, url, successContent){
        
        var request = require('request');

        var clientServerOptions = {
            // Need to update config to make this a loop of routes to test
            uri: url,
            body: JSON.stringify({
                username: fuzz,
                password: fuzz
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return new Promise((resolve, reject) => {
            request(clientServerOptions, function (error, response) {
            
                if(error) throw error;

                //console.log("here");
                //console.log("checking: " + config.routes.login.successContent);
                if(response.body.includes(successContent)){
                    resolve({
                        success: true,
                        fuzz: fuzz
                    });
                    return;
                }
                
                resolve({
                    success: false,
                    fuzz: fuzz
                });
            }); 
        });

    }
}

module.exports = {
    Scanner: Scanner
}

/**
 * 
 * 

 loginAttack(route) {
        
}

findAttackVectors(){

    // Look at the 'views' directory
    fs.readFile(__dirname  + '/../unsecure-app/views/index.ejs', 'utf8', function(err, data){

        if(err){
            throw err;
        }
        console.log(data);

       let scanner = new Scanner();
       scanner.scan(data);

    });
}
 * 
 * scan(data){

        let handler = new htmlparser.DefaultHandler(function(error, dom){

        if(error){
            throw error;
        }

            console.log("Testing inputs);");
            // Find the attack vectors
            var attackVectors = {
                inputs: select(dom, 'input[type=text]'),
                textareas: select(dom, 'textarea'),
                hiddens: select(dom, 'input[type=hidden]'),
                radios: select(dom, 'input[type=radio]'),
                selects: select(dom, 'input[type=select]'),
                checkboxes: select(dom, 'input[type=checkbox]')
            }


            // Make this look at a website???

            console.log(attackVectors);
            console.log("")

        });

        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(data);
    }

    getFieldName(field){

        if(field.attribs.name){
            return field.attribs.name;   
        }

        return null;
        
    }

 * 
 */